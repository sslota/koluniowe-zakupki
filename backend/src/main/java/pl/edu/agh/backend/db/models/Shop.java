package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

@Entity
@Table(name = "Shops")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private String name;
    private float latitude;
    private float longitude;
    private String location;
    @Nullable
    private Integer userID;
}