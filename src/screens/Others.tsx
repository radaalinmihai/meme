import React from "react";
import { Button } from "react-native";

import { useAuth } from "../contexts/auth/AuthContext";

export default function OtherScreen() {
	const { logout } = useAuth();
	return <Button title="Log out" onPress={logout} />;
}
