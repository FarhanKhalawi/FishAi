import { colors } from "./colors";

export const chartConfig = {
    decimalPlaces : 0, // optional, defaults to 2dp
    color : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor : (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style : {
        borderRadius : 16,
    },
    propsForDots : {
        r : "4",
        strokeWidth : "1",
        stroke : colors.white,
    },
};