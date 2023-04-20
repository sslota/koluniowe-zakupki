package pl.edu.agh.backend.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.db.models.Friend;
import pl.edu.agh.backend.db.models.User;
import pl.edu.agh.backend.db.services.SocialsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/socials")
@RequiredArgsConstructor
public class SocialsController {
    private final SocialsService socialsService;

    @PostMapping("/friends")
    public ResponseEntity<Friend> addFriend(@RequestParam Integer userId, @RequestParam Integer friendId){
        Friend friend = Friend.builder().friendID(friendId).userID(userId).build();
        Optional<Friend> f = socialsService.findFriend(friend);
        if(f.isEmpty()) return new ResponseEntity<>(socialsService.addFriend(friend), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @GetMapping("/friends")
    public List<User> getFriends(@RequestParam Integer userId){
        return socialsService.findUserFriends(userId);
    }

    @GetMapping("/friends/name={username}")
    public List<User> searchForUsers(@PathVariable String username){
        return socialsService.findUsersLike(username);
    }

}
