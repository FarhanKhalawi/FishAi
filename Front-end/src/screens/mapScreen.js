import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Drawer } from "react-native-drawer-layout";
import 'react-native-gesture-handler';
import CustomDrawer from "../components/CustomDrawer";


import CustomHeaderBar from "../components/mapScreen/CustomHeaderBar";
import CustomWhiteButton from "../components/mapScreen/CustomWhiteButton";
import CustomLocationButton from "../components/mapScreen/CustomUserLocationButton";
import CustomBottomSheetHandler from "../components/mapScreen/CustomBottomSheetHandler";
import CustomPositionCard from "../components/mapScreen/CustomPositionCard";
import CustomBottomSheetFooter from "../components/mapScreen/CustomBottomSheetFooter";

import { dimensions } from "../config";
import routes from "../config/routes";
import { UserContext } from "../logic/context";

import { calculateDistance, generateDummyData } from "../data";
import { CustomUseEffect, getPermission, getCurrentPosition, getRotation, getPositions } from "../logic";
import { saveToHistory, toggleSignOut } from "../firebase";


const MapScreen = ({ navigation }) => {
    /* ********************************************************************************************** */
    /*                                             STATES                                             */
    /* ********************************************************************************************** */
    const [open, setOpen] = useState(false); // state to store drawer status.
    const [userLocation, setUserLocation] = useState(null); // current user's position
    const [positions, setPositions] = useState([]); // positions provided by AI.
    const [currentCoordinate, setCurrentCoordinate] = useState(null); // current position shown on map, used to calculate angle.
    const [isPositionsLoaded, setIsPositionsLoaded] = useState(false); // boolean variable to check positions are received from back-end.
    const [distance, setDistance] = useState(null); // state to store distance from current position to destination position.
    const [selectedPosition, setSelectedPosition] = useState({}); // state to store the selected position from the list.
    const [isSelectedPosition, setIsSelectedPosition] = useState(true); // state to enable "add to History" button.
    const [isUserLocationLoading, setIsUserLocationLoading] = useState(true); // boolean variable to check user-location are received from Location API.
    const { userData, setUserData } = useContext(UserContext);
    const [isSavingToHistory, setIsSavingToHistory] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    //------------------------------------------------------------------------------------------------//
    /* ********************************************************************************************** */
    /*                                           REFERENCES                                           */
    /* ********************************************************************************************** */
    const mapRef = useRef(); // reference to map component.
    const marksRef = useRef([]); // reference to markers components.
    const bottomSheetModalRef = useRef(null); // reference to bottom-sheet component.

    //------------------------------------------------------------------------------------------------//
    const snapPoints = useMemo(() => [dimensions.windowHeight * 0.30 + dimensions.mapComponentsHeight], []); // set bottom-sheet snap-point


    /* ********************************************************************************************** */
    /*                                        Buttons callbacks                                       */
    /* ********************************************************************************************** */
    const handleSearchButtonPressed = () => {
        /*let records = generateDummyData(4);
        setPositions(records);
        bottomSheetModalRef.current?.present()*/


        setIsSearching(true);
        getPositions(userLocation.coords.latitude, userLocation.coords.longitude).then(positions => {
            setPositions(positions);
            setIsSearching(false);
            bottomSheetModalRef.current?.present();
        })
    }

    const handleMyPositionButton = async () => {
        setIsUserLocationLoading(false)
        await getCurrentPosition().then(usrLocation => setUserLocation(usrLocation))
            .then(() => setIsUserLocationLoading(true))
            .then(() => animateMapToPosition(userLocation.coords.latitude, userLocation.coords.longitude));
    }

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handlePositionSelection = (item) => {
        setSelectedPosition(item);
        setIsSelectedPosition(false);
    }

    const handleAddToHistoryPress = () => {
        Alert.alert('save to History', `Do you want to save this route to your history?`, [{
                text: 'Cancel',
                // onPress: () => Alert.alert('Cancel Pressed'),
                style: 'destructive',
            }, {
                text: 'Save',
                onPress: async () => {
                    setIsSavingToHistory(true);
                    await saveToHistory(userLocation, selectedPosition);
                    setIsSavingToHistory(false);
                    handleCloseModalPress();
                },
                style: 'default',
            }],
            {
                cancelable: false,
                // onDismiss : () => Alert.alert( 'This alert was dismissed by tapping outside the alert dialog.', ),
            },
        );
    }

    const handleLogoutPressed = async () => {
        toggleSignOut();
    };
    //------------------------------------------------------------------------------------------------//

    /* ********************************************************************************************** */
    /*                                            Callbacks                                           */
    /* ********************************************************************************************** */

    // animate map to contain all positions.
    const animateMapToMarkers = (ids) => {
        mapRef.current?.fitToSuppliedMarkers(ids, {
            edgePadding: {
                top: dimensions.mapComponentsHeight * 3,
                right: 40,
                bottom: dimensions.bottomSheetHeight * 1.2,
                left: 40,
            },
            animated: true,
        });

        setIsPositionsLoaded(true);
    }

    // animate map to single position.
    const animateMapToPosition = (latitude, longitude) => {
        mapRef.current?.animateCamera({
            // heading : getRotation( {latitude, longitude}, currentCoordinate ),
            center: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            pitch: 0,
            zoom: 12,
        });
    }

    const onBottomSheetDismiss = () => {
        setDistance(null);
        setIsSelectedPosition(true);
    }

    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                           useEffect                                            */
    /* ********************************************************************************************** */
    // This useEffect hook is used to request permission to access the user's location when the component mounts
    useEffect(() => {
        getPermission().then(location => setUserLocation(location));
    }, []);


    /* react to search button. */
    CustomUseEffect(() => {
        // extracting the ids from the array of objects using map().
        const ids = positions.map(location => location.id);
        animateMapToMarkers(ids);
    }, [positions]);


    /* rect to selection. */
    CustomUseEffect(() => {
        // animate map to the selected marker.
        animateMapToPosition(selectedPosition.latitude, selectedPosition.longitude)

        // view marker details.
        marksRef?.current[selectedPosition.id]?.showCallout();
        let dis = calculateDistance(
            { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
            { latitude: selectedPosition.latitude, longitude: selectedPosition.longitude });

        setDistance(dis);

    }, [selectedPosition]);

    //------------------------------------------------------------------------------------------------//


    return (
        <Drawer
            open={ open }
            onOpen={ () => setOpen(true) }
            onClose={ () => setOpen(false) }
            // swipeEnabled={false}
            swipeEdgeWidth={ 0 }
            renderDrawerContent={ () => {
                return <CustomDrawer
                    imageUri={ userData.profilePicUri }
                    profileOnPress={ () => navigation.navigate(routes.PROFILE_STACK) }
                    historyOnPress={ () => navigation.navigate(routes.HISTORY_STACK) }
                    aboutOnPress={ () => navigation.navigate(routes.ABOUT_STACK) }
                    logoutOnPress={ handleLogoutPressed }
                />
            } }
        >
            <BottomSheetModalProvider>
                <View style={ styles.container }>
                    <StatusBar style={ "dark" }/>
                    {/* conditionally render what will be shown on the screen based on the userLocation state */ }
                    { userLocation ? (
                        <>
                            <MapView
                                ref={ mapRef }
                                style={ styles.map }

                                initialRegion={ {
                                    latitude: userLocation.coords.latitude,
                                    longitude: userLocation.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                } }
                                provider={PROVIDER_GOOGLE}
                                showsUserLocation={ true }
                                mapType={ "terrain" }
                                userLocationPriority={ "passive" }
                                showsMyLocationButton={ false }
                                onRegionChangeComplete={ (props) => {
                                    setCurrentCoordinate(props);
                                } }
                            >
                                { positions && (
                                    positions.map((index) => (
                                        <Marker
                                            ref={ ref => marksRef.current[index.id] = ref }
                                            identifier={ index.id }
                                            key={ index.id }
                                            coordinate={ {
                                                latitude: index.latitude,
                                                longitude: index.longitude,
                                            } }
                                            title={ `${ index.tonnes } tonn` }
                                            description={ `Depth: ${ index.depth } \n latitude ${ index.latitude } \n longitude ${ index.longitude }` }
                                        />
                                    ))
                                ) }

                            </MapView>


                            <View style={ styles.headerBar }>
                                <CustomHeaderBar imageUri={ userData.profilePicUri }
                                                 profilePicOnPress={ () => setOpen((prevOpen) => !prevOpen) }/>
                            </View>
                            <View style={ styles.buttonsContainer }>
                                <CustomWhiteButton title={ "search" }
                                                   isLoading={ isSearching }
                                                   onPress={ handleSearchButtonPressed }/>
                                <CustomLocationButton onPress={ handleMyPositionButton }
                                                      isUserLocationLoading={ isUserLocationLoading }/>
                            </View>
                        </>
                    ) : (<ActivityIndicator size={ 'large' }/>) }
                </View>
                {/* Bottom sheet */ }
                <BottomSheetModal
                    enablePanDownToClose={ false }
                    enableOverDrag={ false }
                    ref={ bottomSheetModalRef }
                    snapPoints={ snapPoints }
                    backgroundStyle={ { backgroundColor: "rgba(246, 246, 246, 0.9)" } }
                    handleIndicatorStyle={ { backgroundColor: "rgba(96, 97, 103, 1)" } }
                    handleComponent={ () => (
                        <CustomBottomSheetHandler distance={ distance } onPress={ handleCloseModalPress }/>) }
                    onDismiss={ onBottomSheetDismiss }
                    footerComponent={ () => <CustomBottomSheetFooter isLoading={ isSavingToHistory }
                                                                     disabled={ isSelectedPosition }
                                                                     onPress={ handleAddToHistoryPress }/> }
                >
                    { isPositionsLoaded ?
                        (<BottomSheetView style={ styles.bottomSheetContainer }>
                                <BottomSheetFlatList
                                    data={ positions }
                                    keyExtractor={ (item) => item.id }
                                    renderItem={ ({ item }) => (
                                        <CustomPositionCard
                                            onPress={ () => handlePositionSelection(item) }
                                            latitude={ item.latitude }
                                            longitude={ item.longitude }
                                            weight={ item.tonnes }/>) }
                                    horizontal={ true }
                                    ItemSeparatorComponent={ () => <View style={ { width: 5 } }/> }
                                />
                            </BottomSheetView>
                        ) : (
                            <ActivityIndicator size={ 'large' }/>
                        ) }
                </BottomSheetModal>

            </BottomSheetModalProvider>
        </Drawer>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: "100%",
        flex: 1,
    },
    headerBar: {
        position: "absolute",
        flex: 1,
        width: dimensions.windowWidth,
        paddingLeft: "3%",
        paddingRight: "3%",
        flexDirection: "row",
        justifyContent: "space-between",
        top: dimensions.statusBarHeight
    },
    buttonsContainer: {
        position: "absolute",
        flex: 1,
        width: dimensions.windowWidth,
        paddingLeft: "5%",
        paddingRight: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: dimensions.mapComponentsHeight,
        elevation: 0, // to override the elevation of the buttons and avoid showing them on front of bottom-sheet.
    },
    bottomSheetContainer: {
        height: dimensions.positionCardHeight,
        paddingLeft: 20,
        marginBottom: 15,
        alignItems: "flex-start",
        flexDirection: "row",
    },
});

export default MapScreen;