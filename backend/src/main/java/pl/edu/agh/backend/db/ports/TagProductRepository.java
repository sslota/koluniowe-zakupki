package pl.edu.agh.backend.db.ports;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.ProductTag;

public interface TagProductRepository extends JpaRepository<ProductTag, Integer> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ProductTag lp WHERE lp.productID=:productID")
    void deleteWithProductId(Integer productID);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ProductTag lp WHERE lp.tagID=:tagID")
    void deleteWithTagId(Integer tagID);
}
