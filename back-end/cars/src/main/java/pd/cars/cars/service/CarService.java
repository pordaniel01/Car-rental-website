package pd.cars.cars.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pd.cars.cars.model.Car;
import pd.cars.cars.repository.CarRepository;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Transactional
    public Car save(Car car){
        return carRepository.save(car);
    }

    @Transactional(readOnly = true)
    public Page<Car> findAll(Pageable pageable) {
        return carRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findById(Long id){
        return carRepository.getOne(id);
    }
    @Transactional
    public void delete(Long id) {
        carRepository.deleteById(id);
    }

    public void editCar(Long id, Car car){
        Car carToEdit = carRepository.getOne(id);
        carToEdit.setName(car.getName());
        carToEdit.setColor(car.getColor());
        carToEdit.setImageUrl(car.getImageUrl());
        carRepository.save(carToEdit);
    }
}
