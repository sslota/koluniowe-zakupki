package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT p FROM Product p JOIN ListProduct lp ON lp.productID=p.ID WHERE lp.listID=:listID")
    List<Product> findUserListProducts(Integer listID);

    @Query(value = "SELECT p FROM Product p WHERE p.userID=:userID OR p.userID=null")
    List<Product> findProducts(Integer userID);

}
