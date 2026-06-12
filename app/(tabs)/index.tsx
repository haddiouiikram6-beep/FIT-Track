import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (

    <>
      <Image
        style={[StyleSheet.absoluteFill, { width: "100%", height: "100%" }]}
        source={require("../../assets/images/FITBACKG.png")}
      />
      <View style={ styles.backg}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/session")}
        >
          <Text style={styles.buttontext}>Start Today</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
 backg:{
  flex:1,
  justifyContent: "center",
  alignItems:"center"

 },
  button: {
backgroundColor:"#ededed",
paddingHorizontal: 30,
paddingVertical: 15,
borderRadius:12,
top:90

  },
  buttontext: {
fontSize:30,
fontWeight:"bold",
color: "black"
  }
})