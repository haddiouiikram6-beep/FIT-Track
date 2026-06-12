import * as Location from "expo-location";

const GOOGLE_MAPS_API_KEY = "<YOUR_GOOGLE_MAPS_API_KEY>"; // Replace with your real API key from https://console.cloud.google.com

export const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        throw new Error("Permission denied");
    }
    const location = await Location.getCurrentPositionAsync({});
    return location.coords;
};

export const getGoogleMapsStaticImageUrl = (
    latitude: number,
    longitude: number,
    width = 600,
    height = 300
) => {
    // Use Google Maps API if key is provided
    if (GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "<YOUR_GOOGLE_MAPS_API_KEY>") {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=${width}x${height}&scale=2&markers=color:red%7C${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
    }

    // Fallback to OpenStreetMap Static API (no key required)
    return `https://maps.osm.org/static?center=${latitude},${longitude}&zoom=15&width=${width}&height=${height}&style=openstreetmap&markers=${latitude},${longitude}`;
};