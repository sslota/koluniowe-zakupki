package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.backend.db.models.ListProduct;

public interface ListProductRepository extends JpaRepository<ListProduct, Integer> {

}
