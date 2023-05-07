package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SharedList")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SharedList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private Integer userID;
    private Integer listID;
}
