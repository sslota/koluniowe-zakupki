package pl.edu.agh.koluniowezakupki.db.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

@Entity
@Table(name = "ShoppingLists")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShoppingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private String name;
    @Nullable
    private Integer userID;


}
