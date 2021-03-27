import { TouchableNativeFeedback, View } from "react-native";
import { DELIMITATOR_COLOR } from "../../styles/colors";
import React from "react";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

const TabBarButton = ({ onPress, children }: BottomTabBarButtonProps) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={{
          flex: 1,
          backgroundColor: DELIMITATOR_COLOR,
        }}>
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

export default TabBarButton;
