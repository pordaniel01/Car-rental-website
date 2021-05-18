package pd.cars.cars.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pd.cars.cars.model.User;
import pd.cars.cars.repository.UserRepository;
import pd.cars.cars.security.model.MyUserDetail;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(userName);
        if(user == null)
            throw new UsernameNotFoundException("Not found: " + user.getUserName());
        MyUserDetail myUserDetail = new MyUserDetail(user);
        return myUserDetail;
    }
}