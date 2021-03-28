import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Header from "../components/header";
import { setStatusBarPadding } from "../helpers/normalizers";
import ProfileScreen from "../screens/Home/Profile";
import { SCREEN_BACKGROUND } from "../styles/colors";
import MainTabs from "./MainStack";

const Stack = createStackNavigator();
// Export each of the components bellow to its own function
const MainNavigator: React.FC = (): JSX.Element => {
	return (
		<Stack.Navigator
			headerMode="screen"
			screenOptions={{
				gestureEnabled: false,
				gestureDirection: "horizontal",
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				header: Header,
				cardStyle: {
					backgroundColor: SCREEN_BACKGROUND,
					paddingTop: setStatusBarPadding(),
				},
			}}>
			<Stack.Screen name="Main" component={MainTabs} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
		</Stack.Navigator>
	);
};

export default MainNavigator;
