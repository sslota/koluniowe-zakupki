package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Groups")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private String name;
    private Integer creatorID;
}
