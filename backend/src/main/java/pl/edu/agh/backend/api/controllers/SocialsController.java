package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.db.models.records.Friend;
import pl.edu.agh.backend.db.models.Friendship;
import pl.edu.agh.backend.db.services.SocialsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/socials")
@RequiredArgsConstructor
public class SocialsController {
    private final SocialsService socialsService;

    @PostMapping("/friends")
    public ResponseEntity<Friendship> addFriend(@RequestParam Integer userID, @RequestParam Integer friendID){
        Friendship friendship = Friendship.builder().friendID(friendID).userID(userID).build();
        Optional<Friendship> f = socialsService.findFriend(friendship);
        if(f.isEmpty()) return new ResponseEntity<>(socialsService.addFriend(friendship), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @GetMapping("/friends")
    public List<Friend> getFriends(@RequestParam Integer userID){
        return socialsService.findUserFriends(userID);
    }

    @GetMapping("/friends/name={username}")
    public List<Friend> searchForUsers(@PathVariable String username){
        return socialsService.findUsersLike(username);
    }

    @DeleteMapping("/friends")
    public ResponseEntity<Object> removeFriend(@RequestParam Integer userID, @RequestParam Integer friendID){
        Optional<Friendship> friendship = socialsService.removeFromFriendList(userID, friendID);
        return friendship.map(e -> new ResponseEntity<>(HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
