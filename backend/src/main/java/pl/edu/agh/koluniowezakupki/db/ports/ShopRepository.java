package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.koluniowezakupki.db.models.Shop;

public interface ShopRepository extends JpaRepository<Shop, Integer>{

}
