import axios from "axios";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export async function filterNearbyLongPackages(userCity, packages) {
  if (!userCity) return [];

  const cityCoordsMap = {};

  // Step 1: Get coordinates of user's city
  let userCoords = null;
  try {
    const res = await axios.get("https://api.geoapify.com/v1/geocode/search", {
      params: {
        text: userCity,
        apiKey: GEOAPIFY_API_KEY,
      },
    });
    const feature = res.data.features?.[0];
    if (feature) {
      userCoords = {
        lat: feature.properties.lat,
        lon: feature.properties.lon,
      };
    }
  } catch (error) {
    console.error("Error getting user's city coordinates:", error);
    return [];
  }

  if (!userCoords) return [];

  // Step 2: Get coordinates of each unique nearest_city
  const uniqueCities = [...new Set(packages.map((pkg) => pkg.nearest_city))];

  await Promise.all(
    uniqueCities.map(async (city) => {
      try {
        const res = await axios.get(
          "https://api.geoapify.com/v1/geocode/search",
          {
            params: { text: city, apiKey: GEOAPIFY_API_KEY },
          }
        );
        const feature = res.data.features?.[0];
        if (feature) {
          cityCoordsMap[city] = {
            lat: feature.properties.lat,
            lon: feature.properties.lon,
          };
        }
      } catch (error) {
        console.error(`Error fetching coordinates for city: ${city}`, error);
      }
    })
  );

  // Step 3: Haversine distance function
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Step 4: Filter by distance (<= 3705 km)
  return packages.filter((pkg) => {
    const coords = cityCoordsMap[pkg.nearest_city];
    if (!coords) return false;

    const distance = getDistance(
      userCoords.lat,
      userCoords.lon,
      coords.lat,
      coords.lon
    );
    return distance <= 3705;
  });
}
