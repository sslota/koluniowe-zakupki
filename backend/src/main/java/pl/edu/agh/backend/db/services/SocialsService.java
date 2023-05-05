package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Example;
import pl.edu.agh.backend.db.models.Friend;
import pl.edu.agh.backend.db.models.User;
import pl.edu.agh.backend.db.ports.FriendRepository;
import pl.edu.agh.backend.db.ports.GroupRepository;
import pl.edu.agh.backend.db.ports.UserRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class SocialsService {
    private final FriendRepository friendRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;


    public Friend addFriend(Friend friend){
        return friendRepository.save(friend);
    }

    public Optional<Friend> findFriend(Friend friend){
        Example<Friend> example = Example.of(friend);
        return friendRepository.findOne(example);
    }

    public List<User> findUserFriends(Integer userID){
        return friendRepository.findFriends(userID);
    }

    public List<User> findUsersLike(String username){
        return userRepository.findUsersWithUsername(username);
    }
}
