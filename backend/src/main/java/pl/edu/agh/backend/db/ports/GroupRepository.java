package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.backend.db.models.Group;

public interface GroupRepository extends JpaRepository<Group, Integer> {
}
