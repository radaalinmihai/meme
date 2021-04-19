import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import Card from "../../components/home/Card";
import { CardActions, ICardData } from "../../components/home/CardReducer";
import useCardActions from "../../components/home/useCardActions";
import { HomeWrapper } from "../../components/styles";
import { useCard } from "../../helpers/homeSelectors";

const image = "https://picsum.photos/200/300";

const dummyData: ICardData[] = Array(12)
	.fill({})
	.map((_, index) => ({ id: index, uri: image }));

const MAX = 3;
const HomeScreen = (): JSX.Element => {
	const dispatch = useDispatch();
	const { secondId, activeId, cardsData } = useCard();
	const activeCards = (cardsData as ICardData[]).slice(0, MAX);

	useEffect(() => {
		dispatch(useCardActions(CardActions.setCards, dummyData));
	}, []);

	useEffect(() => {
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

	console.log(activeCards);

	return (
		<HomeWrapper>
			{activeCards.map((dummy) => (
				<Card
					key={dummy.id}
					removeItem={removeItem}
					active={dummy.id === activeId}
					second={dummy.id === secondId}
					src={dummy.uri}
				/>
			))}
		</HomeWrapper>
	);
};

export default HomeScreen;
