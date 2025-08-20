import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { dimensions } from "../config";
import { MaterialIcons } from "@expo/vector-icons";

/**

 A custom profile picture component that displays an image and an optional edit icon.
 @param {Object} props - The component's props.
 @param {number} props.size - The size of the profile picture (in pixels).
 @param {string|null} [props.uri=null] - The URI of the profile picture image (optional, defaults to null).
 @param {boolean} [props.editIconShown=false] - Whether to show the edit icon (optional, defaults to false).
 @param {Function} [props.editOnPress] - The function to call when the edit icon is pressed (optional).
 @param {number} [props.Angle=0] - The angle at which to position the edit icon (in degrees, optional, defaults to 0).
 @returns {JSX.Element} - The rendered component.
 */
const CustomProfilePicture = ({size, uri = null, editIconShown = false, editOnPress, Angle = 0}) => {
    const imageSource = uri !== null ? {uri : uri} : require( "../../assets/profile_pic.png" );

    // editIcon positioning.
    const radians = Angle * Math.PI / 180;
    const x = Math.cos( radians ) * size / 2 + size / 2 - (size / 5) / 2;
    const y = Math.sin( radians ) * size / 2 + size / 2 - (size / 5) / 2;

    const styles = StyleSheet.create( {
        editIcon : {
            position : "absolute",
            width : Math.min( 40 * dimensions.scale, 60 ),
            height : Math.min( 40 * dimensions.scale, 60 ),
            borderRadius : Math.min( 20 * dimensions.scale, 30 ),
            alignItems : "center",
            justifyContent : "center",
            backgroundColor : "rgba(255,255,255,0.75)",
            left : x,
            bottom : y,
        },
    } );

    return (
        <>
            <Image style={{width : size, height : size, borderRadius : size / 2}} source={imageSource}></Image>
            {editIconShown &&
                <TouchableOpacity style={styles.editIcon} onPress={editOnPress}>
                    <MaterialIcons name="edit" size={size / 7} color="black"/>
                </TouchableOpacity>
            }
        </>
    );
};

export default CustomProfilePicture;
