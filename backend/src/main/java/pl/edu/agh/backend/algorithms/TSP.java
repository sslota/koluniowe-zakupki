package pl.edu.agh.backend.algorithms;

import pl.edu.agh.backend.db.models.records.Location;
import pl.edu.agh.backend.db.models.records.LocationTags;

import java.util.ArrayList;
import java.util.List;

public class TSP{

    public static float calculateDistance(Location location1, Location location2) {
        float xDiff = location1.latitude() - location2.latitude();
        float yDiff = location1.longitude() - location2.longitude();
        return (float) Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    public static List<LocationTags> solveTSP(List<LocationTags> locationTags) {
        int numLocations = locationTags.size();
        List<LocationTags> bestPath = null;
        float shortestDistance = Float.MAX_VALUE;

        List<LocationTags> locations = new ArrayList<>(locationTags);

        List<List<LocationTags>> permutations = generatePermutations(locations);

        for (List<LocationTags> path : permutations) {
            float totalDistance = 0;
            for (int i = 0; i < numLocations - 1; i++) {
                LocationTags current = path.get(i);
                LocationTags next = path.get(i + 1);
                totalDistance += calculateDistance(current.location(), next.location());
            }

            if (totalDistance < shortestDistance) {
                shortestDistance = totalDistance;
                bestPath = path;
            }
        }

        return bestPath;
    }

    public static List<List<LocationTags>> generatePermutations(List<LocationTags> locations) {
        List<List<LocationTags>> permutations = new ArrayList<>();
        generatePermutationsHelper(locations, 0, permutations);
        return permutations;
    }

    private static void generatePermutationsHelper(List<LocationTags> locations, int index, List<List<LocationTags>> permutations) {
        if (index == locations.size() - 1) {
            permutations.add(new ArrayList<>(locations));
            return;
        }

        for (int i = index; i < locations.size(); i++) {
            swap(locations, index, i);
            generatePermutationsHelper(locations, index + 1, permutations);
            swap(locations, index, i);
        }
    }

    private static void swap(List<LocationTags> locations, int i, int j) {
        LocationTags temp = locations.get(i);
        locations.set(i, locations.get(j));
        locations.set(j, temp);
    }
}
