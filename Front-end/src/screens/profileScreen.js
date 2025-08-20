import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
    BottomSheetFlatList,
    BottomSheetBackdrop
} from "@gorhom/bottom-sheet";

import { chartConfig, colors, dimensions } from "../config";
import routes from '../config/routes';
import { UserContext } from "../logic/context";
import Background_2 from '../../assets/Background_2.png'

import { CustomUseEffect } from "../logic";
import { getHistory } from "../firebase";

import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";
import CustomProfilePicture from "../components/CustomProfilePicture";
import CustomDatePickerCard from "../components/profileScreen/customDatePickerCard";
import CustomBottomSheetHandler from "../components/mapScreen/CustomBottomSheetHandler";


const ProfileScreen = ({ navigation }) => {
    /* ********************************************************************************************** */
    /*                                             STATES                                             */
    /* ********************************************************************************************** */
    const [expedition, setExpedition] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null); // state to store the selected date from date picker.
    const [isDateLoading, setIsDateLoading] = useState(true); // boolean variable to check all dates are received from Firebase API.
    const [date, setDate] = useState(null); // a state to store all dates received from Firebase.
    const [history, setHistory] = useState(null); // a state to store all history received from Firebase.
    const [graphData, setGraphData] = useState(null); // a state to store graph data after sorting and ready to be displayed.
    const [noFishWeight, setNoFishWeight] = useState(true);
    const { userData } = useContext(UserContext);


    //------------------------------------------------------------------------------------------------//
    /* ********************************************************************************************** */
    /*                                           REFERENCES                                           */
    /* ********************************************************************************************** */
    const bottomSheetModalRef = useRef(null);  // reference to bottom-sheet component.

    const snapPoints = useMemo(() => [dimensions.windowHeight * 0.30 + dimensions.mapComponentsHeight], []); // set bottom-sheet snap-point

    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                        Buttons callbacks                                       */
    /* ********************************************************************************************** */
    const handleSelectDatePressed = () => {
        bottomSheetModalRef.current?.present();

    }

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleDateSelection = (item) => {
        setSelectedDate(item);
    };
    //------------------------------------------------------------------------------------------------//

    /* ********************************************************************************************** */
    /*                                            Callbacks                                           */
    /* ********************************************************************************************** */
    /* render backDrop component */
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                { ...props }
                disappearsOnIndex={ -1 }
                appearsOnIndex={ 0 }
                opacity={ 0.5 } // 0.5 by default
                optionOnPress={ () => navigation.navigate() }
            />
        ),
        []
    );

    const getAllHistory = async () => {
        getHistory().then(data => {
            setHistory(data);
        })
    };

    const updateGraphAndExp = async () => {
        if (selectedDate !== null) {
            const filteredHistory = history.filter(item => item.date === selectedDate);

            const fishWeights = filteredHistory
                .filter(item => item.fishWeight !== "")
                .map(item => Number(item.fishWeight.replace(",", ".")));

            // Check if all fishWeights are empty strings
            if (fishWeights.length === 0) {
                setGraphData(null);
                return;
            }

            const output = {
                labels: ["week 1", "week 2", "week 3", "week 4"],
                datasets: [
                    {
                        data: fishWeights
                    },
                ],
            };
            setGraphData(output);
            setNoFishWeight(false);
        }
    };

    const updateExpeditions = () => {
        setExpedition(history.length);
    };


    //------------------------------------------------------------------------------------------------//


    /* ********************************************************************************************** */
    /*                                           useEffect                                            */
    /* ********************************************************************************************** */
    // update the graph based on the selected date.
    CustomUseEffect(() => {
        updateGraphAndExp().then(null);
        handleCloseModalPress();
    }, [selectedDate]);

    // hide activity indicator in the bottom sheet when dates are loaded.
    CustomUseEffect(() => {
        if (date !== null) {
            setIsDateLoading(false);
            setSelectedDate(date[0]);
        }
    }, [date]);

    // extract dates from History data and
    CustomUseEffect(() => {
        if (history !== null) {
            const uniqueDates = [...new Set(history.map(item => item.date))];
            setDate(uniqueDates);
            updateExpeditions();
        }
    }, [history]);

    useEffect(() => {
        getAllHistory().then(null);
    }, []);

    //------------------------------------------------------------------------------------------------//

    return (
        <BottomSheetModalProvider>
            <CustomScreenWithNavigationHeader
                contentContainerStyle={ styles.container }
                backgroundImage={ Background_2 }
                optionIcon={ "edit" }
                optionOnPress={ () => navigation.navigate(routes.EDIT_PROFILE_SCREEN) }
                backOnPress={ () => navigation.goBack() }
                title={ "Profile" }
            >
                {/* profile picture container */ }
                <View style={ styles.profilePictureContainer }>
                    <CustomProfilePicture uri={ userData.profilePicUri }
                                          size={ Math.min(200 * dimensions.scale, 300) }/>
                </View>

                {/* blue container */ }
                <View style={ styles.blueContainer }>

                    {/* container 1 */ }
                    <View style={ styles.usernameContainer }>
                        <Text style={ styles.usernameText }>{ userData.nickname }</Text>

                        <View style={ styles.infoContainer }>
                            <View style={ styles.leftInfoContainer }>
                                <Text style={ styles.infoText1 }>MEMBER SINCE</Text>
                                <Text style={ styles.infoText2 }>{ userData.registeredDate }</Text>
                            </View>

                            <View style={ styles.rightInfoContainer }>
                                <Text style={ styles.infoText1 }>EXPEDITION</Text>
                                <Text style={ styles.infoText2 }>{ expedition }</Text>
                            </View>
                        </View>
                    </View>

                    {/* container 2 */ }
                    <View style={ styles.graphContainer }>
                        <View style={ styles.graphTextContainer }>
                            <Text style={ styles.graphText }>Reeling in the Good Times:</Text>
                            <Text style={ [styles.graphText, { textDecorationLine: "underline" }] }
                                  onPress={ handleSelectDatePressed }>{ selectedDate ? selectedDate : 'Select date' }</Text>
                        </View>
                        <View style={ styles.lineChartContainer }>
                            { noFishWeight ? (
                                <Text>please log your fish weight in History to display the graph</Text>
                            ) : graphData ? (
                                <LineChart
                                    data={ graphData }
                                    width={ dimensions.windowWidth - 16 }
                                    height={ dimensions.windowHeight * 0.35 }
                                    verticalLabelRotation={ 60 }
                                    chartConfig={ chartConfig }
                                    bezier
                                    style={ {
                                        borderRadius: 15,
                                    } }
                                    withVerticalLines={ false }
                                    yLabelsOffset={ 30 }
                                    xLabelsOffset={ -10 }
                                    transparent={ true }
                                    fromZero={ true }
                                />
                            ) : (
                                <ActivityIndicator size={ 'large' }/>
                            ) }

                        </View>
                    </View>
                </View>
            </CustomScreenWithNavigationHeader>
            {/* Bottom sheet */ }
            <BottomSheetModal
                // handleComponent={() => (<View/>)}
                enablePanDownToClose={ false }
                enableOverDrag={ false }
                ref={ bottomSheetModalRef }
                snapPoints={ snapPoints }
                backdropComponent={ renderBackdrop }
                handleComponent={ () => (
                    <CustomBottomSheetHandler onPress={ handleCloseModalPress }/>) }
                backgroundStyle={ { backgroundColor: "rgb(246,246,246)" } }
                handleIndicatorStyle={ { backgroundColor: "rgba(96, 97, 103, 1)" } }

            >
                { !isDateLoading ?
                    (<BottomSheetView style={ styles.bottomSheetContainer }>
                            <BottomSheetFlatList
                                data={ date }
                                keyExtractor={ (item) => item }
                                ItemSeparatorComponent={ () => <View style={ { height: 20 } }/> }
                                ListFooterComponent={ () => <View style={ { height: 100 } }/> }
                                renderItem={ ({ item }) => (
                                    <CustomDatePickerCard item={ item } onPress={ () => handleDateSelection(item) }/>
                                ) }

                            />
                        </BottomSheetView>
                    ) : (
                        <ActivityIndicator size={ 'large' }/>
                    ) }
            </BottomSheetModal>


        </BottomSheetModalProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    profilePictureContainer: {
        top: Math.min(100 * dimensions.scale, 150),
        zIndex: 1, // bring profile picture on top for ios.
        elevation: 1, // bring profile picture on top for Android.
    },
    blueContainer: {
        width: dimensions.windowWidth - 8,
        height: dimensions.windowHeight * 0.75,
        backgroundColor: colors.primaryBlue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Math.min(100 * dimensions.scale, 150),
        paddingBottom: 25,

    },

    usernameContainer: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: Math.min(40 * dimensions.scale, 48),
    },

    infoContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: dimensions.windowHeight * 0.02,

    },
    leftInfoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    rightInfoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    infoText1: {
        color: colors.white,
        fontSize: Math.min(14 * dimensions.scale, 18),
    },
    infoText2: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: Math.min(24 * dimensions.scale, 28),
    },
    graphContainer: {
        // flex : 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    graphTextContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: dimensions.windowHeight * 0.01,
    },
    graphText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: Math.min(14 * dimensions.scale, 18),
    },
    lineChartContainer: {
        width: "100%",
        alignItems: "center",
    },

    bottomSheetContainer: {
        flex: 1,
    },
});

export default ProfileScreen;