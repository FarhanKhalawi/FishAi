import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, dimensions } from "../../config";

const CustomDatePickerCard = ({item, onPress}) => {
    return (
        <TouchableHighlight underlayColor={colors.positionCardCoordinateText} style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{item}</Text>
        </TouchableHighlight>
    );
};


const styles = StyleSheet.create( {
    container : {
        alignItems : 'center',
        justifyContent : 'center',
        padding: 10,
    },
    text : {
        fontSize : Math.min( 26 * dimensions.scale, 36 ),
        // fontWeight : 'bold',
        color : 'black',
    },
} );

export default CustomDatePickerCard;