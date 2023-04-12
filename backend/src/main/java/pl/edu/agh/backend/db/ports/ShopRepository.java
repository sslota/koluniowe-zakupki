package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.backend.db.models.Shop;

public interface ShopRepository extends JpaRepository<Shop, Integer>{

}
