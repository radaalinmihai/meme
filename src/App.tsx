import React, { useEffect } from "react";
import { AuthProvider } from "./contexts/auth/AuthContext";
import FlashMessage from "react-native-flash-message";
import { StatusBar, View } from "react-native";
import Index from "./navigators/Index";
import { setStatusBarPadding } from "./helpers/normalizers";
import { ProfileProvider } from "./contexts/home/ProfileContext";

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
      <FlashMessage position="top" style={{
        // @ts-ignore
        paddingTop: setStatusBarPadding()
      }} />
    </View>
  );
};

export default App;
