package pd.cars.cars.controller;

import org.apache.coyote.Response;
import org.apache.tomcat.util.http.HeaderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.header.Header;
import org.springframework.web.bind.annotation.*;
import pd.cars.cars.model.Car;
import pd.cars.cars.model.Rent;
import pd.cars.cars.model.User;
import pd.cars.cars.repository.UserRepository;
import pd.cars.cars.service.CarService;
import pd.cars.cars.service.RentService;
import pd.cars.cars.service.UserService;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
//@EnableAutoConfiguration
@RequestMapping("/api/car-rental")
@CrossOrigin(origins = "http://localhost:4200")
public class CarWebsiteController {

    private static final String BASE_URI = "/api/car-rental";

    @Autowired
    CarService carService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RentService rentService;

    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAll(Pageable pageable) {
        Page<Car> foundPage = carService.findAll(pageable);
        HttpHeaders headers = new HttpHeaders();
        return  ResponseEntity.ok()
                .headers(headers)
                .body(foundPage.getContent());
    }

    @GetMapping("/cars/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car foundCar = carService.findById(id);
        if(foundCar == null)
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(foundCar);
    }

    @PutMapping("/cars/{id}")
    public ResponseEntity<Car> editCarById(@PathVariable Long id,@RequestBody Car car){
        carService.editCar(id,car);
        return ResponseEntity.ok(car);
    }

    @GetMapping("/rents")
    public ResponseEntity<List<Rent>> getRents(){
        boolean isAdmin = false;
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        for(GrantedAuthority authority: authorities){
            if(authority.getAuthority().contains("ADMIN"))
                isAdmin = true;
        }
        if(isAdmin){
            return ResponseEntity.ok(rentService.findAll());
        }else{
            User user = userRepository.findByUserName( SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
            return ResponseEntity.ok(rentService.findByUser(user));
        }
    }

    @PostMapping("/cars/{id}")
    public ResponseEntity<Rent> createRent(@PathVariable Long id){
        Rent rent = new Rent();
        rent.setCar(getCarById(id).getBody());
        rent.setUser(userRepository.findByUserName( SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()));
        rent.setRentTime(LocalDateTime.now());
        rentService.save(rent);
        return ResponseEntity.ok(rent);
    }

    @GetMapping("isrented/{id}")
    public ResponseEntity isCarRented(@PathVariable Long id){
        Car car = carService.findById(id);
        if(rentService.findByCar(car) != null)
            return ResponseEntity.ok().body("true");
        else
            return ResponseEntity.ok().body("false");
    }

    @DeleteMapping("/cars/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        carService.delete(id);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/cars")
    public ResponseEntity<Car> createCar(@RequestBody  Car car) throws URISyntaxException {
        Car saveItem = carService.save(car);
        Long newId = saveItem.getId();
        HttpHeaders headers = new HttpHeaders();
        String message = "Car entity created";
        headers.add("X-restApp-alert", message);
        return ResponseEntity.created(new URI(BASE_URI + "/" +saveItem.getId()))
                .headers(headers)
                .body(saveItem);
    }

    @DeleteMapping("/rents/{id}")
    public ResponseEntity<Rent> deleteRent(@PathVariable Long id){
        return ResponseEntity.ok().body(rentService.delete(id));
    }
}
