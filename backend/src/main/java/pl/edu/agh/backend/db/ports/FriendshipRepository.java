package pl.edu.agh.backend.db.ports;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.edu.agh.backend.db.models.records.Friend;
import pl.edu.agh.backend.db.models.Friendship;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {

    @Query(value = "SELECT new pl.edu.agh.backend.db.models.records.Friend(u.ID, u.username) FROM User u join Friendship f on f.friendID=u.ID where f.userID = :userID")
    List<Friend> findFriends(Integer userID);

}
