import React from "react";
import { Button } from "react-native";
import useAuth from "../hooks/useAuth";

export default function OtherScreen() {
  const { logout } = useAuth();
  return <Button title="Log out" onPress={logout} />;
}
