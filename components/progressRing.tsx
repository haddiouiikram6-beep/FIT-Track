import React from "react";
import { View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function ProgressRing() {
    return (
        <View>
            <AnimatedCircularProgress
                size={180}
                width={15}
                fill={75}
                tintColor="#1f786a"
                backgroundColor="#e0e0e0"
                duration={1500}
                rotation={0}
            >
                {(fill: number) => <>{Math.round(fill)}%</>}
            </AnimatedCircularProgress>
        </View>
    );
}