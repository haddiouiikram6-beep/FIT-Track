import React from "react";
import { Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";


export default function ProgressRing() {
    return (
        <View>
            <AnimatedCircularProgress
                size={180}
                width={15}
                fill={75}
                tintColor="#fcb500"
                backgroundColor="#fdf8f8"
                duration={1500}
                rotation={0}
            >
                {(fill: number) => (
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                        {Math.round(fill)}%
                    </Text>
                )}
            </AnimatedCircularProgress>
        </View>
    );
}