package pd.cars.cars.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pd.cars.cars.model.Car;

public interface CarRepository extends JpaRepository<Car,Long>, JpaSpecificationExecutor<Car> {
}
