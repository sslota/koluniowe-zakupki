package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT u FROM User u where u.username = :username")
    Optional<User> findByUsername(String username);
}
