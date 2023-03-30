package pl.edu.agh.koluniowezakupki.db;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.koluniowezakupki.models.User;


public interface DatabaseRepository extends JpaRepository<User, Integer> {

}
