import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  // 📸 Open gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 📷 Open camera
  const openCamera = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        Alert.alert("Permission required");
        return;
      }
    }
    setCameraVisible(true);
  };

  return (
    <View style={styles.container}>

      {/* Profile Image */}
      <Image
        source={{
          uri: image || "https://i.pravatar.cc/300",
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>My Profile</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>Import Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={openCamera}>
        <Text style={styles.btnText}>Open Camera</Text>
      </TouchableOpacity>

      {/* CAMERA */}
      {cameraVisible && (
        <View style={styles.cameraContainer}>
          <CameraView style={{ flex: 1 }} facing="front">
            
            <TouchableOpacity
              style={styles.captureBtn}
              onPress={() => {
                setCameraVisible(false);
              }}
            >
              <Text style={{ color: "#fff" }}>Close Camera</Text>
            </TouchableOpacity>

          </CameraView>
        </View>
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#f5f6fa",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#f2bd49",
    padding: 12,
    width: "80%",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
  },

  cameraContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  captureBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    borderRadius: 10,
  },
});