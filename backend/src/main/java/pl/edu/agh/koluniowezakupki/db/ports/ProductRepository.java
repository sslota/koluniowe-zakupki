package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.koluniowezakupki.db.models.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "SELECT p FROM Product p JOIN ListProduct lp ON lp.productID=p.ID WHERE lp.listID=:listId")
    List<Product> findUserListProducts(Integer listId);

}
