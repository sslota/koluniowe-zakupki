package pl.edu.agh.backend.api.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.backend.db.models.records.LocationTags;
import pl.edu.agh.backend.db.services.RoutingService;
import java.util.List;

@RestController
@RequestMapping("/route")
@RequiredArgsConstructor
public class RoutingController {
    private final RoutingService routingService;

    @GetMapping("/latitude={latitude}/longitude={longitude}/listID={listID}")
    public List<LocationTags> getRoute(@PathVariable float latitude, @PathVariable float longitude, @PathVariable Integer listID){
        return routingService.shortestPath(latitude, longitude, listID);
    }
}
