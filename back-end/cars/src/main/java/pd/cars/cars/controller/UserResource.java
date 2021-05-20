package pd.cars.cars.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pd.cars.cars.model.User;
import pd.cars.cars.repository.UserRepository;
import pd.cars.cars.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserResource {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity createUser( @RequestBody User user) throws URISyntaxException {

        user.setAuthority("ROLE_USER");
        if(userService.userValid(user).equals("user"))
            return ResponseEntity.ok().body("user");
        if(userService.userValid(user).equals("email"))
            return ResponseEntity.ok().body("email");

        userService.save(user);
        HttpHeaders headers = new HttpHeaders();
        String message = "User entity created";
        headers.add("X-restApp-alert", message);
            return ResponseEntity.created(new URI("/api/user/" + user.getId()))
                    .headers(headers)
                    .body(user);

    }
    @GetMapping("/user")
    public ResponseEntity<User> getUserInfo()throws URISyntaxException {
        String user = SecurityContextHolder.getContext().getAuthentication().getName();
        User userEntity = userRepository.findByUserName(user);
        return ResponseEntity.ok().body(userEntity);
    }
    
    @GetMapping("/logout")
    public void logout(HttpServletResponse response){
        Cookie cookie = new Cookie("token","");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addHeader("Access-Control-Expose-Headers", "Set-Cookie");
        response.addHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
        response.addCookie(cookie);
    }
    
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.findAll());
    }
    
    
}
