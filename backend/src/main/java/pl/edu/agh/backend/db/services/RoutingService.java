package pl.edu.agh.backend.db.services;

import lombok.RequiredArgsConstructor;
import pl.edu.agh.backend.algorithms.TSP;
import pl.edu.agh.backend.db.models.Shop;
import pl.edu.agh.backend.db.models.Tag;
import pl.edu.agh.backend.db.models.records.Location;
import pl.edu.agh.backend.db.models.records.LocationTags;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.lang.Math;
import java.util.concurrent.atomic.AtomicBoolean;


@RequiredArgsConstructor
public class RoutingService {

    private final ShopService shopService;
    private final TagService tagService;

    public List<LocationTags> process(HashMap<String, Boolean> foundTags, List<LocationTags> sortedLocations) {
        List<LocationTags> filteredLocationTags = new ArrayList<>();
        for(LocationTags location : sortedLocations) {
            AtomicBoolean variable = new AtomicBoolean(false);
            location.tagList().forEach(tag -> {
                if (foundTags.containsKey(tag.getName()) && !foundTags.get(tag.getName())) {
                    variable.set(true);
                    foundTags.put(tag.getName(), true);
                }
            });
            if (variable.get()) filteredLocationTags.add(location);
            if (!foundTags.containsValue(false)) break;
        }
        return filteredLocationTags;
    }

    public List<LocationTags> shortestPath(float latitude, float longitude, Integer listID) {

        List<LocationTags> sortedLocations = shopService.getShops().stream()
                .sorted(new Comparator<Shop>() {
                    @Override
                    public int compare(Shop s1, Shop s2) {
                        return Double.compare(Math.sqrt((s1.getLatitude() - latitude) * (s1.getLatitude() - latitude) + (s1.getLongitude() - longitude) * (s1.getLongitude() - longitude)), Math.sqrt((s2.getLatitude() - latitude) * (s2.getLatitude() - latitude) + (s2.getLongitude() - longitude) * (s2.getLongitude() - longitude)));
                    }
                })
                .map(shop -> new LocationTags(new Location(shop.getLatitude(), shop.getLongitude()), tagService.getTagsForShop(shop.getID()), shop.getName()))
                .toList();

        List<Tag> tagsForList = tagService.getTagsForList(listID);

        HashMap<String, Boolean> foundTags = new HashMap<>();
        tagsForList.forEach(tag -> foundTags.put(tag.getName(), false));
        return TSP.solveTSP(process(foundTags, sortedLocations));


    }
}
