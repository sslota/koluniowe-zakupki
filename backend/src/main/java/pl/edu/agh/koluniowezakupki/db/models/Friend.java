package pl.edu.agh.koluniowezakupki.db.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Friends")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Friend {
    @Id
    private Integer userID;
    private Integer friendID;
}
