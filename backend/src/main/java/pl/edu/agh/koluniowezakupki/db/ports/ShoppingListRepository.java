package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.agh.koluniowezakupki.db.models.ShoppingList;

import java.util.List;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer> {

    @Query(value = "SELECT sl FROM ShoppingList sl WHERE sl.userID = :userId")
    List<ShoppingList> findByUserId(@Param("userId") Integer userId);

}
