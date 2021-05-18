package pd.cars.cars.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pd.cars.cars.model.AuthRequest;
import pd.cars.cars.model.User;
import pd.cars.cars.repository.UserRepository;
import pd.cars.cars.service.UserService;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserResource {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;



    @PostMapping("/register")
    public ResponseEntity<User> createUser( @RequestBody User user) throws URISyntaxException {

        System.out.println("user: " + user.getUserName());
        user.setAuthority("ROLE_USER");
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
}
