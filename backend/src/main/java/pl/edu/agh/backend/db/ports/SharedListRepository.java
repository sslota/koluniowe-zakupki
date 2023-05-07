package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.backend.db.models.SharedList;

public interface SharedListRepository extends JpaRepository<SharedList, Integer> {
}
