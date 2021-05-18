package pd.cars.cars.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pd.cars.cars.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private JwtCookieStore jwtCookieStore;

    private UserRepository userRepository;

    public JwtTokenAuthenticationFilter(JwtCookieStore jwtCookieStore , UserRepository ur) {
        this.jwtCookieStore = jwtCookieStore;
        this.userRepository = ur;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        try {
            jwtCookieStore.retrieveToken(request)
                    .ifPresent(auth -> SecurityContextHolder.getContext().setAuthentication(auth));
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
        }

        chain.doFilter(request, response);

    }
}