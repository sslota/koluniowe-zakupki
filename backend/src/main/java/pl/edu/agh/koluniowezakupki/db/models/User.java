package pl.edu.agh.koluniowezakupki.db.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Users")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private String username;
    private String password;

}
