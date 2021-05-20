package pd.cars.cars.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pd.cars.cars.model.Car;
import pd.cars.cars.model.Rent;
import pd.cars.cars.model.User;
import pd.cars.cars.repository.RentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RentService {
    @Autowired
    RentRepository rentRepository;

    @Transactional
    public void save(Rent rent){
        rentRepository.save(rent);
    }

    @Transactional(readOnly = true)
    public Page<Rent> findAll(Pageable pageable) {
        return rentRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<Rent> findAll() {
        return rentRepository.findAll();
    }

    @Transactional
    public List<Rent> findByUser(User user){
        List<Rent> rents = rentRepository.findAll();
        ArrayList<Rent> userRents = new ArrayList<Rent>();
        for(Rent rent : rents){

            if(rent.getUser().getId() == user.getId()) {
                userRents.add(rent);
                System.out.println("rent user:" + rent.getUser().getId() + "user to match: " + user.getId());
            }
        }
        return userRents;
    }

    @Transactional
    public Rent findByCar(Car car){
        List<Rent> rents = rentRepository.findAll();
        for(Rent rent : rents){
            System.out.println("db car: " + rent.getCar().getId() + "given car is: " + car.getId());
            if(rent.getCar().getId() == car.getId()) {
                System.out.println("found");
                return rent;
            }
        }
        return null;
    }

    @Transactional
    public Rent delete(Long id){
        Optional<Rent> rent = rentRepository.findById(id);
        rentRepository.deleteById(id);
        return rent.get();
    }
}
