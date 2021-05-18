package pd.cars.cars.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pd.cars.cars.model.Rent;

public interface RentRepository extends JpaRepository<Rent, Long> {
}
