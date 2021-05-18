package pd.cars.cars.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rent")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rent_id")
    private long id;

    @OneToOne
    @JoinColumn(name = "fk_car", nullable=false)
    private Car car;

    @ManyToOne
    @JoinColumn(name="fk_user", nullable=false)
    private User user;

    @Column(name = "rent_ts")
    private LocalDateTime rentTime;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getRentTime() {
        return rentTime;
    }

    public void setRentTime(LocalDateTime rentTime) {
        this.rentTime = rentTime;
    }
}
