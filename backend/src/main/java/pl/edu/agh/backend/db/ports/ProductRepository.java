package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.records.ListPosition;
import pl.edu.agh.backend.db.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT new pl.edu.agh.backend.db.models.records.ListPosition(p.ID, p.name, pol.quantity) FROM Product p JOIN PositionOnList pol ON pol.productID=p.ID WHERE pol.listID=:listID")
    List<ListPosition> findProductsiInList(Integer listID);

    @Query(value = "SELECT p FROM Product p WHERE p.userID=:userID OR p.userID=null")
    List<Product> findUserAndDefaultProducts(Integer userID);

    @Query(value = "SELECT p FROM Product p WHERE p.userID=:userID")
    List<Product> findUserProducts(Integer userID);

}
