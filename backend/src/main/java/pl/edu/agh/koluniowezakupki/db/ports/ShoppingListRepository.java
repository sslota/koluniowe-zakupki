package pl.edu.agh.koluniowezakupki.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.agh.koluniowezakupki.db.models.ShoppingList;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer> {
}
