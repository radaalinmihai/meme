import React, { useEffect } from "react";
import { Text } from "react-native";
import useProfile from "../../hooks/useProfile";

const ProfileScreen: React.FC = (): JSX.Element => {
  const {getProfile} = useProfile();
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Text>Hello</Text>
  );
}

export default ProfileScreen;
