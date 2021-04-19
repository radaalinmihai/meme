import { CardActions, ICardData, ICardState } from "./CardReducer";

const useCardActions = (type: CardActions, payload: ICardState | ICardData[] | number) => ({
	type,
	payload,
});

export default useCardActions;
