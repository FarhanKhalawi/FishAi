import { Dimensions } from 'react-native';
import { Platform } from "react-native";
import Constants from "expo-constants"

const {width, height} = Dimensions.get( 'window' );

export const dimensions = {
    statusBarHeight : Constants.statusBarHeight,
    os : Platform.OS,

    windowWidth : width,
    windowHeight : height,

    scale : Math.min( width, height ) / 428,
    WidthScale : width / 428,
    HeightScale : height / 926,


    mapComponentsHeight : (height * 0.05),

    whiteButtonWidth : (width * 0.75),

    transparentButtonWidth : (width * 0.80),
    transparentButtonHeight : (height * 0.06),

    bottomSheetHeight : (height * 0.35),

    positionCardWidth : (width * 0.35),
    positionCardHeight : (height * 0.2),

    googleButtonWidth: (width * 0.80),
    googleButtonHeight: (height * 0.05),

    drawerButtonHeight: 50,

};