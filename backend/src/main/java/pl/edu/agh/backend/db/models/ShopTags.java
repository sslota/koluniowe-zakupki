package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ShopTags")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopTags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private Integer shopID;
    private Integer tagID;

}
