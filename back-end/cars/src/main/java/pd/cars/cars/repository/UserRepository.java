package pd.cars.cars.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pd.cars.cars.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUserName(String userName);
}
