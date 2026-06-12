import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";

export function usePedometer() {
    const [steps, setSteps] = useState(0);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        let subscription: any;
        let mounted = true;

        async function requestAndroidPermission() {
            if (Platform.OS !== "android") {
                return true;
            }

            if (Platform.Version < 29) {
                return true;
            }

            try {
                const result = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
                    {
                        title: "Activity permission",
                        message: "This app needs access to your activity data to count steps.",
                        buttonPositive: "Allow",
                    }
                );
                return result === PermissionsAndroid.RESULTS.GRANTED;
            } catch (error) {
                console.warn("Activity permission request failed:", error);
                return false;
            }
        }

        async function startPedometer() {
            try {
                const permissionGranted = await requestAndroidPermission();
                if (!mounted) return;

                if (!permissionGranted) {
                    setIsAvailable(false);
                    return;
                }

                const available = await Pedometer.isAvailableAsync();
                if (!mounted) return;
                setIsAvailable(available);

                if (available) {
                    subscription = Pedometer.watchStepCount((result) => {
                        if (!mounted) return;
                        setSteps(result.steps);
                    });
                }
            } catch (error) {
                console.warn("Pedometer error:", error);
                if (mounted) setIsAvailable(false);
            }
        }

        startPedometer();

        return () => {
            mounted = false;
            if (subscription && typeof subscription.remove === "function") {
                subscription.remove();
            } else if (subscription && typeof subscription.unsubscribe === "function") {
                subscription.unsubscribe();
            }
        };
    }, []);

    return { steps, isAvailable };
}
