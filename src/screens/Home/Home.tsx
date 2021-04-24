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
		console.log(cardsData);
		return (cardsData as ICardData[]).slice(0, maxActiveCards);
	}, [cardsData]);

	useEffect(() => {
		dispatch(useCardActions(CardActions.setCards, dummyData));
	}, []);

	useEffect(() => {
		const MAX = maxActiveCards as number;
		if (activeCards.length >= MAX) {
			dispatch(
				useCardActions(CardActions.set, {
					activeId: activeCards[MAX - 1].id,
					secondId: activeCards[MAX - 2].id,
				}),
			);
		}
	}, [activeCards]);

	const removeItem = (isFinished: boolean) => {
		if (isFinished) {
			dispatch(useCardActions(CardActions.removeSwipedCard, activeCards[0].id));
		}
	};

	return (
		<HomeWrapper>
			{activeCards.map((card) => (
				<Card
					key={card.id}
					removeItem={removeItem}
					active={card.id === activeId}
					second={card.id === secondId}
					src={card.uri}
				/>
			))}
		</HomeWrapper>
	);
};

export default HomeScreen;
