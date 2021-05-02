import Card from "components/home/Card";
import { CardActions, ICardData } from "components/home/CardReducer";
import useCardActions from "components/home/useCardActions";
import { HomeWrapper } from "components/styles";
import { useCard } from "helpers/homeSelectors";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

const image = "https://picsum.photos/200/300";

const dummyData: ICardData[] = Array(12)
	.fill({})
	.map((_, index) => ({ id: index, uri: image }));

const HomeScreen = (): JSX.Element => {
	const dispatch = useDispatch();
	const { secondId, activeId, cardsData, maxActiveCards } = useCard();
	const activeCards = useMemo(() => {
		return (cardsData as ICardData[]).slice(0, maxActiveCards);
	}, [cardsData]);

	useEffect(() => {
		dispatch(useCardActions(CardActions.setCards, dummyData));
	}, []);

	useEffect(() => {
		const activeData = (cardsData as ICardData[]).slice(0, maxActiveCards);
		// console.log(activeData);
		const MAX = maxActiveCards as number;
		if (activeData.length >= MAX) {
			dispatch(
				useCardActions(CardActions.set, {
					activeId: activeData[2].id,
					secondId: activeData[1].id,
				}),
			);
		}
	}, [cardsData]);

	const removeItem = (isFinished: boolean) => {
		if (isFinished) {
			dispatch(useCardActions(CardActions.removeSwipedCard, cardsData[0].id));
		}
	};
	// console.log(cardsData);
	return (
		<HomeWrapper>
			{activeCards.length > 0 && (
				<>
					<Card removeItem={removeItem} active second={false} src={activeCards[0].uri} />
					<Card removeItem={removeItem} active={false} second src={activeCards[1].uri} />
					<Card removeItem={removeItem} active={false} second={false} src={activeCards[2].uri} />
				</>
			)}
		</HomeWrapper>
	);
};

export default HomeScreen;
