import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, dimensions } from "../../config";
import { useState } from "react";
import { setFishWeight } from "../../firebase";


const CustomHistoryCard = ({ item }) => {
    const [fishWeightState, setFishWeightState] = useState(item.fishWeight.toString());

    const handleFishWeightSubmit = async () => {
        setFishWeight(item.id, fishWeightState).then(null);
    };
    return (
        <View style={ styles.container }>
            <View style={ styles.LeftContainer }>
                <Text style={ styles.dayText }>{ item.day }</Text>
                <Text style={ styles.dateText }>{ item.date }</Text>
            </View>
            <View style={ { width: 2, height: "100%", backgroundColor: "#808080", marginRight: 10 } }/>
            <View style={ styles.rightContainer }>
                <View style={ styles.rightTopContainer }>
                    <Text style={ styles.boldText }>From:</Text>
                    <Text style={ styles.normalText }>{ item.from }</Text>
                    <Text style={ styles.boldText }>To:</Text>
                    <Text style={ styles.normalText }>{ item.to }</Text>
                </View>
                <View style={ styles.rightBottomContainer }>
                    <Text style={ styles.boldText }>Fish Weight:</Text>
                    <View style={ styles.weightContainer }>
                        <TextInput
                            returnKeyType="done"
                            keyboardType={ "numeric" }
                            style={ styles.textInput }
                            placeholder={ "weight" }
                            value={ fishWeightState } onChangeText={ text => setFishWeightState(text) }
                            onSubmitEditing={handleFishWeightSubmit}
                        />
                        <Text style={ styles.boldText }>tonn</Text>

                    </View>
                </View>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
    },
    LeftContainer: {
        width: Math.min(dimensions.windowWidth * 0.12 * dimensions.scale, 80),
        alignItems: "center",
        marginRight: 10,
    },
    rightContainer: {},
    rightTopContainer: {
        marginBottom: 10,
    },
    rightBottomContainer: {
        flexDirection: "row",
    },
    dayText: {
        fontWeight: "bold",
        fontSize: Math.min(24 * dimensions.scale, 28),
    },
    dateText: {
        fontSize: Math.min(12 * dimensions.scale, 16),
    },
    boldText: {
        fontWeight: "bold",
    },
    normalText: {
        fontSize: Math.min(12 * dimensions.scale, 16),
    },
    weightContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 20,
    },
    textInput: {
        marginRight: 10,
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        width: Math.min(dimensions.windowWidth * 0.25 * dimensions.scale, 200),
    },
});

export default CustomHistoryCard;