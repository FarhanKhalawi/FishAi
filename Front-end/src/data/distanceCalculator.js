export const calculateDistance = (currentCoordinate, destinationCoordinate) => {
    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(destinationCoordinate.latitude - currentCoordinate.latitude);
    const dLon = degreesToRadians(destinationCoordinate.longitude - currentCoordinate.longitude);

    const lat1 = degreesToRadians(currentCoordinate.latitude);
    const lat2 = degreesToRadians(destinationCoordinate.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (earthRadiusKm * c).toFixed(2);
};

const degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
};