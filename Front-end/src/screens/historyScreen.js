import {FlatList, StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from "react";
import {Feather} from '@expo/vector-icons';

import {colors, dimensions} from "../config";
import {generateDummyHistory} from "../data";
import Background_2 from '../../assets/Background_2.png'

import CustomScreenWithNavigationHeader from "../components/CustomScreenWithNavigationHeader";
import CustomHistoryCard from "../components/historyScreen/CustomHistoryCard";
import { getHistory } from "../firebase";
import { getPermission } from "../logic";


const HistoryScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getUserHistory = async () => {
        setIsRefreshing(true);
        const d = await getHistory();
        setData(d);
        setIsRefreshing(false);
    };

    useEffect(() => {
        getUserHistory().then(null);
    }, []);

    return (
        <CustomScreenWithNavigationHeader style={styles.container}
                                          contentContainerStyle={styles.container}
                                          backgroundImage={Background_2}
                                          optionShown={false}
                                          backOnPress={() => navigation.goBack()}
                                          title={"History"}
        >
            <View style={styles.blueContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.iconContainer}>
                        <Feather name="info" size={30} color={colors.white}/>
                    </View>
                    <Text style={styles.textContainer}>
                        <Text style={styles.infoText}>Visualize your fishing progress with a catch weight graph.{'\n'}Enter
                            fish weight to see your results over time in your profile</Text>
                    </Text>
                </View>
                <FlatList
                    style={{width: dimensions.windowWidth - 14}}
                    ItemSeparatorComponent={() => <View style={{height: 4}}/>}
                    ListFooterComponent={() => <View style={{height: dimensions.windowHeight * 0.20}}/>}
                    keyExtractor={(item) => item.id}
                    // TODO: change the data source
                    data={data}
                    renderItem={({item}) => (<CustomHistoryCard item={item}/>)}
                    refreshing={isRefreshing}
                    onRefresh={getUserHistory}
                />
            </View>
        </CustomScreenWithNavigationHeader>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    blueContainer: {
        width: dimensions.windowWidth - 8,
        height: dimensions.windowHeight - 140,
        backgroundColor: colors.primaryBlue,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
    },
    iconContainer: {
        marginRight: 10,
    },
    textContainer: {
        width: "90%",
    },
    infoText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: Math.min(14 * dimensions.scale, 18),
        letterSpacing: 1,
        flexWrap: "wrap",
    }
});

export default HistoryScreen;