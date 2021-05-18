package pd.cars.cars.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import pd.cars.cars.repository.UserRepository;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.stream.Collectors;


public class JwtCookieStore {

    private static final String COOKIE_NAME = "token";

    private static final int EXPIRATION =  30 * 60 * 1000;

    private UserRepository userRepository;

    private byte[] secret;

    public JwtCookieStore(byte[] secret, UserRepository userRepository) {
        this.secret = secret;
        this.userRepository = userRepository;
    }

    public void storeToken(HttpServletResponse response, Authentication auth) {
        String token = generateToken(auth);
        storeTokenInCookie(response, token);
    }

    private void storeTokenInCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(COOKIE_NAME, token);
        cookie.setMaxAge(EXPIRATION);
        cookie.setPath("/");
        //cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        response.addHeader("Access-Control-Expose-Headers", "Set-Cookie");
        response.addHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        //response.addHeader("Content-Type", "application/json");
    }

    private String generateToken(Authentication auth) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
                .setSubject(auth.getName())
                .claim("authorities", auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public Optional<Authentication> retrieveToken(HttpServletRequest request) {
        Optional<Cookie> cookie = findCookie(request);

        if (cookie.isEmpty()) {
            return Optional.empty();
        }
        String token = cookie.get().getValue();
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject();
        if (!username.isBlank()) {
            String authority = userRepository.findByUserName(username).getAuthority();
            String[] authorityParsed = authority.split(",");
            ArrayList<SimpleGrantedAuthority> auths = new ArrayList<>();
            for(int i = 0; i < authorityParsed.length; i++){
                auths.add(new SimpleGrantedAuthority(authorityParsed[i]));
            }
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    username, null, auths);

            return Optional.of(auth);
        }
        return Optional.empty();
    }

    private Optional<Cookie> findCookie(HttpServletRequest request) {
        Cookie cookies[] = request.getCookies();
        for(Cookie cookie : cookies){
        }
        if (request.getCookies() == null) {
            return Optional.empty();
        }
        return Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(COOKIE_NAME))
                .findAny();
    }


}