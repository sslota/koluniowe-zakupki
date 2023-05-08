package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.Friend;
import pl.edu.agh.backend.db.models.User;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

    @Query(value = "SELECT u FROM User u join Friend f on f.friendID=u.ID where f.userID = :userID")
    List<User> findFriends(Integer userID);

}
