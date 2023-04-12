package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.backend.db.models.User;


public interface UserRepository extends JpaRepository<User, Integer> {

}
