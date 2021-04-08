import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import {ITabBarIconProps} from "../../helpers/interfaces";

const TabBarIcon = (
  route: Readonly<{key: string; name: string}> & Readonly<{params?: Readonly<object | undefined>}>,
) => ({focused}: ITabBarIconProps) => {
  let iconName!: string;

  switch (route.name) {
    case "Home":
      iconName = "home";
      break;
    case "Notifications":
      iconName = "notifications";
      break;
    case "Others":
      iconName = "more-horiz";
      break;
  }

  return <MaterialIcon name={iconName} size={38} color={focused ? "#696969" : "white"} />;
};

export default TabBarIcon;
