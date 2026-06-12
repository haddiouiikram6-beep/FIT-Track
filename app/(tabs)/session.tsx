import { getCurrentLocation, getGoogleMapsStaticImageUrl } from "@/services/gps";
import { usePedometer } from "@/services/pedometer";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressRing from "../../components/progressRing";

export default function SessionScreen() {
  const router = useRouter();
  const { steps, isAvailable } = usePedometer();
  const [location, setLocation] = useState<any>(null);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    const loadLocation = async () => {
      setMapLoading(true);
      try {
        const coords = await getCurrentLocation();
        setLocation(coords);
        setMapUrl(getGoogleMapsStaticImageUrl(coords.latitude, coords.longitude));
      } catch (error) {
        console.log(error);
      } finally {
        setMapLoading(false);
      }
    };

    loadLocation();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pedometer</Text>
      <ProgressRing />
      <Text>
        {isAvailable === null
          ? "Vérification du podomètre..."
          : isAvailable
            ? `Nombre de pas : ${steps}`
            : "Pedometer non disponible"}
      </Text>
      {mapUrl && !mapLoading ? (
        <Image source={{ uri: mapUrl }} style={styles.mapImage} />
      ) : mapLoading ? (
        <Text style={styles.mapPlaceholder}>Loading map...</Text>
      ) : (
        <Text style={styles.mapPlaceholder}>
          Map location will load once GPS permission is granted.
        </Text>
      )}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distance</Text>
          <Text style={styles.cardValue}>2.5 KM</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Challenges</Text>
          <Text style={styles.cardValue}>3 / 5</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Position</Text>
          <Text>
            {location
              ? `${location.latitude.toFixed(4)} , ${location.longitude.toFixed(4)}`
              : "Loading..."}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => router.push("/history")}
      >
        <Text style={styles.buttonText2}>Your Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cards: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 20,
    flexWrap: "wrap",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fa9804",
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  button2: {
    backgroundColor: "#f78c08",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText2: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  mapImage: {
    width: "90%",
    height: 200,
    borderRadius: 16,
    marginTop: 20,
  },
  mapPlaceholder: {
    marginTop: 20,
    color: "#666",
    textAlign: "center",
  },
});