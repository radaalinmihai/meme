import { Platform, StatusBar } from "react-native";

export const setStatusBarPadding = (): number => Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 0;
