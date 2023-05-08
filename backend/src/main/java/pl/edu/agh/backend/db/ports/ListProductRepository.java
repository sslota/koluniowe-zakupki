package pl.edu.agh.backend.db.ports;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.ListProduct;

public interface ListProductRepository extends JpaRepository<ListProduct, Integer> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ListProduct lp WHERE lp.listID=:listID")
    void deleteWithListId(Integer listID);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ListProduct lp WHERE lp.productID=:productID")
    void deleteWithProductId(Integer productID);

}
