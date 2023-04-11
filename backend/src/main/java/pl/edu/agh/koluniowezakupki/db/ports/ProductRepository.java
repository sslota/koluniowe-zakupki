package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.koluniowezakupki.db.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
