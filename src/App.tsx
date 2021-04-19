import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";

import { AuthProvider } from "./contexts/auth/AuthContext";
import { ProfileProvider } from "./contexts/home/ProfileContext";
import { setStatusBarPadding } from "./helpers/normalizers";
import Index from "./navigators/Index";
import store from "./store";

const App = (): JSX.Element => {
	useEffect(() => {
		StatusBar.setTranslucent(true);
		StatusBar.setBackgroundColor("transparent");
	}, []);
	return (
		<>
			<Provider store={store}>
				<AuthProvider>
					<ProfileProvider>
						<Index />
					</ProfileProvider>
				</AuthProvider>
			</Provider>
			<FlashMessage
				position="top"
				style={{
					paddingTop: setStatusBarPadding(),
				}}
			/>
		</>
	);
};

export default App;
