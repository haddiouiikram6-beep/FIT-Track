import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SessionScreen() {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    let subscription: any;

    const startPedometer = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);

      if (available) {
        subscription = Pedometer.watchStepCount((result) => {
          setSteps(result.steps);
        });
      }
    };

    startPedometer();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedometer</Text>
      <Text>
        {isAvailable
          ? `Nombre de pas : ${steps}`
          : "Pedometer non disponible"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});