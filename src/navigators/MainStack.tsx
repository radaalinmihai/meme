import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarButton from "components/navigation/TabBarButton";
import TabBarIcon from "components/navigation/TabBarIcon";
import { setStatusBarPadding } from "helpers/normalizers";
import React from "react";
import HomeScreen from "screens/Home/Home";
import NotificationScreen from "screens/Notifications";
import OtherScreen from "screens/Others";
import { DELIMITATOR_COLOR, SCREEN_BACKGROUND } from "styles/colors";

const Tab = createBottomTabNavigator();

const MainTabs: React.FC = (): JSX.Element => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarButton: TabBarButton,
				tabBarIcon: TabBarIcon(route),
			})}
			tabBarOptions={{
				tabStyle: {
					backgroundColor: DELIMITATOR_COLOR,
				},
				showLabel: false,
				style: {
					height: 58,
					borderTopWidth: 0,
					elevation: 0,
				},
			}}
			sceneContainerStyle={{
				paddingTop: setStatusBarPadding(),
				backgroundColor: SCREEN_BACKGROUND,
			}}
			initialRouteName="Home">
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Notifications" component={NotificationScreen} />
			<Tab.Screen name="Others" component={OtherScreen} />
		</Tab.Navigator>
	);
};

export default MainTabs;
