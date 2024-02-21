package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.Shop;

import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Integer>{

    @Query(value = "SELECT p FROM Shop p WHERE p.userID=:userID")
    List<Shop> findUserShops(Integer userID);

}
