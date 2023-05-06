package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Friends")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private Integer userID;
    private Integer friendID;
}
