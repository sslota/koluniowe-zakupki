package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "ListProducts")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private Integer listID;
    private Integer productID;
    private Integer quantity;
}
