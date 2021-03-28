import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { SUBMIT_BUTTON_BACKGROUND, WHITE } from "../../styles/colors";

const SubmitButton = ({ children, onPress, disabled }) => {
	const addDisabledStyle = () => disabled && styles.disabledButton;
	return (
		<TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
			<View style={[styles.button, addDisabledStyle()]}>
				<Text style={styles.buttonText}>{children}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: SUBMIT_BUTTON_BACKGROUND,
		width: "90%",
		alignSelf: "center",
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
	disabledButton: {
		opacity: 0.5,
	},
	buttonText: {
		fontSize: 20,
		color: WHITE,
	},
});

export default SubmitButton;
