package pl.edu.agh.backend.db.ports;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.ShopTag;

public interface TagShopRepository extends JpaRepository<ShopTag, Integer> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ShopTag lp WHERE lp.shopID=:shopID")
    void deleteWithShopId(Integer shopID);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ShopTag lp WHERE lp.tagID=:tagID")
    void deleteWithTagId(Integer tagID);
}
