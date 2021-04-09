import React, { FunctionComponent } from "react";
import { useWindowDimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import AppConfiguration from "../../contexts/AppConfiguration";
import { CardCtx, ICardProps } from "../../helpers/interfaces";
import { AnimatedCardImage } from "../styles";

const Card: FunctionComponent<ICardProps> = ({ src, active, removeItem }) => {
	const { width } = useWindowDimensions();
	const threshold = Math.floor(width / AppConfiguration.cardThresholdFraction);
	const x = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		const rotate = interpolate(
			x.value,
			[0, width],
			[active ? AppConfiguration.cardActiveStartRotation : 0, AppConfiguration.cardRotationValue],
		);
		return {
			transform: [{ translateX: x.value }, { rotate: `${rotate}deg` }],
		};
	});

	const handlePan = useAnimatedGestureHandler({
		onStart: (event, ctx) => {
			const context = ctx as CardCtx;
			context.startX = x.value;
		},
		onActive: (event, ctx) => {
			const context = ctx as CardCtx;
			x.value = context.startX + event.translationX;
		},
		onEnd: () => {
			const xValue = Math.floor(x.value);
			if (xValue < 0 && xValue < threshold * -1) {
				x.value = withTiming(
					(width +
						(AppConfiguration.cardRotationValue +
							Math.abs(AppConfiguration.cardActiveStartRotation)) *
							2) *
						-1,
					{},
					runOnJS(removeItem),
				);
			} else if (xValue > 0 && xValue > threshold) {
				x.value = withTiming(
					width +
						(AppConfiguration.cardRotationValue +
							Math.abs(AppConfiguration.cardActiveStartRotation) * 2),
					{
						duration: 500,
						easing: Easing.bezier(0.25, 0.1, 0.25, 1),
					},
					runOnJS(removeItem),
				);
			} else {
				x.value = withSpring(0);
			}
		},
	});

	return (
		<PanGestureHandler onGestureEvent={handlePan}>
			<AnimatedCardImage style={animatedStyles} source={{ uri: src }} />
		</PanGestureHandler>
	);
};

export default Card;
