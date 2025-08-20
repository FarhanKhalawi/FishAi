import * as Location from "expo-location";

/** retrieves the user's current position using the Location API and updates the UserLocation state variable. */
export const getCurrentPosition = async () => {
    let location = await Location.getCurrentPositionAsync( {} );
    return ( location );
}

/** requests permission from the user to access their location. */
export const getPermission = async () => {
    const status = await Location.requestForegroundPermissionsAsync();
    if (!status.granted) {
        alert( "Error! Failed to get location permission." );
    }
    let location = await getCurrentPosition();
    return (location);
};

/** calculates the rotation angle of the camera for the map view based on the difference between
 the user's current location and the coordinate to which the camera is pointing */
export const getRotation = (destPosition, currentCoordinate) => {
    const xDiff = destPosition.latitude - currentCoordinate.latitude;
    const yDiff = destPosition.longitude - currentCoordinate.longitude;
    return (Math.atan2( yDiff, xDiff ) * 180.0) / Math.PI;
};