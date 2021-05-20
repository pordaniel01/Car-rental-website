package pd.cars.cars.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pd.cars.cars.model.Rent;
import pd.cars.cars.model.User;
import pd.cars.cars.repository.RentRepository;
import pd.cars.cars.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;


    @Transactional
    public void save(User user){
        //passwordEncoder.encode()
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public String userValid(User givenUser){
        List<User> users = userRepository.findAll();
        for(User user : users){
            if(user.getEmail().equals(givenUser.getEmail()))
                return "email";
            if(user.getUserName().equals(givenUser.getUserName()))
                return "user";
        }
        return "";
    }

    public void editUser(User user) {
        User userToEdit = userRepository.getOne(userRepository.findByUserName(SecurityContextHolder.getContext().getAuthentication().getName()).getId());
        userToEdit.setEmail(user.getEmail());
        userToEdit.setPassword(user.getPassword());
        userToEdit.setUserName(user.getUserName());
        userRepository.save(userToEdit);
    }
}
