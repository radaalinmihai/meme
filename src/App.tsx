import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import FlashMessage from "react-native-flash-message";

import { AuthProvider } from "./contexts/auth/AuthContext";
import { ProfileProvider } from "./contexts/home/ProfileContext";
import { setStatusBarPadding } from "./helpers/normalizers";
import Index from "./navigators/Index";

const App = (): JSX.Element => {
	useEffect(() => {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<AuthProvider>
				<ProfileProvider>
					<Index />
				</ProfileProvider>
			</AuthProvider>
			<FlashMessage
				position="top"
				style={{
					paddingTop: setStatusBarPadding(),
				}}
			/>
		</View>
	);
};

export default App;
