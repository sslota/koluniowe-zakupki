package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "PositionOnLists")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PositionOnList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private Integer listID;
    private Integer productID;
    private Integer quantity;
}
