package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.koluniowezakupki.db.models.User;


public interface UserRepository extends JpaRepository<User, Integer> {

}
