package pl.edu.agh.backend.db.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

@Entity
@Table(name = "Tags")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;
    private String name;
    @Nullable
    private Integer userID;
    @Nullable
    private Integer parentTagID;
}
