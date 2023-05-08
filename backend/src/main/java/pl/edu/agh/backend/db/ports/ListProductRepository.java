package pl.edu.agh.backend.db.ports;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.PositionOnList;

public interface ListProductRepository extends JpaRepository<PositionOnList, Integer> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM PositionOnList lp WHERE lp.listID=:listID")
    void deleteWithListId(Integer listID);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM PositionOnList lp WHERE lp.productID=:productID")
    void deleteWithProductId(Integer productID);

}
