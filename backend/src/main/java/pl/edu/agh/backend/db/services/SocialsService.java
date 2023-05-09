package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.models.records.Friend;
import pl.edu.agh.backend.db.models.Friendship;
import pl.edu.agh.backend.db.ports.FriendshipRepository;
import pl.edu.agh.backend.db.ports.GroupRepository;
import pl.edu.agh.backend.db.ports.UserRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class SocialsService {
    private final FriendshipRepository friendshipRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;


    public Friendship addFriend(Friendship friendship){
        Example<Friendship> example = Example.of(friendship);
        Optional<Friendship> friendInDb = friendshipRepository.findOne(example);
        return friendInDb.orElseGet(() -> friendshipRepository.save(friendship));
    }

    public Optional<Friendship> findFriend(Friendship friendship){
        Example<Friendship> example = Example.of(friendship);
        return friendshipRepository.findOne(example);
    }

    public List<Friend> findUserFriends(Integer userID){
        return friendshipRepository.findFriends(userID);
    }

    public List<Friend> findUsersLike(String username){
        return userRepository.findUsersWithUsername(username);
    }

    public Optional<Friendship> removeFromFriendList(Integer userID, Integer friendID){
        Example<Friendship> example = Example.of(Friendship.builder().userID(userID).friendID(friendID).build());
        Optional<Friendship> friendship = friendshipRepository.findOne(example);
        friendship.ifPresent(friendshipRepository::delete);
        return friendship;
    }
}
