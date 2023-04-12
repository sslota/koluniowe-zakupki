package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.koluniowezakupki.db.models.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}
