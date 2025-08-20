import { StyleSheet, Text, View } from 'react-native';
import CustomBottomSheetButton from "./CustomBottomSheetButton";

const CustomBottomSheetFooter = ({disabled, onPress, isLoading}) => {
    return (
        <View style={styles.container}>
            <CustomBottomSheetButton isLoading={isLoading} title={"Add to History"} onPress={onPress} disabled={disabled}/>
        </View>
    )
};


const styles = StyleSheet.create( {
    container : {
        width : "100%",
        height : 50,
        alignItems : "center",
        justifyContent : "flex-start",
    },
} );

export default CustomBottomSheetFooter;