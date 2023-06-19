package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.Tag;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {

    @Query(value = "SELECT t FROM Tag t JOIN ProductTag pt ON pt.tagID = t.ID WHERE pt.productID = :id")
    List<Tag> findTagsForProduct(Integer id);


    @Query(value = "SELECT t FROM Tag t JOIN ShopTag pt ON pt.tagID = t.ID WHERE pt.shopID = :id")
    List<Tag> findTagsForShop(Integer id);
    @Query(value = "SELECT DISTINCT t FROM Tag t " +
            "JOIN ProductTag pt ON pt.tagID = t.ID " +
            "JOIN Product p ON pt.productID = p.ID " +
            "JOIN PositionOnList pl ON pl.productID = p.ID WHERE pl.listID = :listID "
    )
    List<Tag> findTagsForList(Integer listID);
}
