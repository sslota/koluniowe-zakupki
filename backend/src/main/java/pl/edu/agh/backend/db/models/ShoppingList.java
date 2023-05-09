package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;

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
    private Integer userID;

}
