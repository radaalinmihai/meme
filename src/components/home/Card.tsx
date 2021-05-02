import React, { FunctionComponent, useEffect, useRef, useState } from "react";
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
import getEventEmitter from "../../helpers/eventemitter";
import { CardCtx, ICardProps } from "../../helpers/interfaces";
import { AnimatedCardImage } from "../styles";

const CardEmitter = getEventEmitter;

const Card: FunctionComponent<ICardProps> = ({ src, active, removeItem, second, index }) => {
	const { width } = useWindowDimensions();
	const threshold = Math.floor(width / AppConfiguration.cardThresholdFraction);
	const x = useSharedValue(0);
	const [activeXValue, setActiveXValue] = useState<number>(0);
	const lastActiveXValue = useRef<number>(0);
	const animatedStyles = useAnimatedStyle(() => {
		const secondCardRotate = interpolate(
			activeXValue as number,
			[-width, 0, width],
			[AppConfiguration.cardActiveStartRotation, 0, AppConfiguration.cardActiveStartRotation],
		);
		const rotate = interpolate(
			x.value,
			[0, width],
			[AppConfiguration.cardActiveStartRotation, AppConfiguration.cardRotationValue],
		);
		const finalRotateValue: number = active ? rotate : second ? secondCardRotate : 0;
		return {
			transform: [{ translateX: x.value }, { rotate: `${finalRotateValue}deg` }],
		};
	}, [activeXValue, active, second]);

	useEffect(() => {
		// console.log("render");
		return () => console.log("unmounted :(");
	}, []);

	const setActiveX = (canDo: boolean) => {
		if (canDo) {
			CardEmitter.emit("activeX", Math.floor(x.value));
			lastActiveXValue.current = Math.floor(x.value);
		}
	};

	const eventHandler = (xValue: number) => {
		if (xValue !== lastActiveXValue.current) {
			setActiveXValue(xValue);
			lastActiveXValue.current = xValue;
		}
	};

	const handlePan = useAnimatedGestureHandler({
		onStart: (event, ctx) => {
			const context = ctx as CardCtx;
			context.startX = x.value;
			runOnJS(setActiveX)(active && lastActiveXValue.current !== x.value);
		},
		onActive: (event, ctx) => {
			const context = ctx as CardCtx;
			x.value = context.startX + event.translationX;
			runOnJS(setActiveX)(active && lastActiveXValue.current !== x.value);
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

	useEffect(() => {
		if (second) {
			CardEmitter.on("activeX", eventHandler);
		}
		return () => CardEmitter.off("activeX");
	}, [second]);
	return (
		<PanGestureHandler onGestureEvent={handlePan}>
			<AnimatedCardImage style={animatedStyles} source={{ uri: src }} />
		</PanGestureHandler>
	);
};

export default Card;
