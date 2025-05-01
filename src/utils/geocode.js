// This function fetches the coordinates of a given location name using the Geoapify API
export const getCoordinates = async (locationName) => {
  const apiKey = "cb6efbfab9324b779e170c09305d2536";
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      locationName
    )}&apiKey=${apiKey}`
  );
  const data = await res.json();
  return data.features[0]?.geometry.coordinates; // [lon, lat]
};
