import { IAction } from "helpers/interfaces";

export interface ICardData {
	id: number;
	uri: string;
}

export enum CardActions {
	setActive = "setActive",
	setSecond = "setSecond",
	setCards = "setCards",
	removeSwipedCard = "removeSwipedCard",
	set = "set",
}

export interface ICardState {
	activeId?: number;
	secondId?: number;
	cardsData?: ICardData[];
	maxActiveCards?: number;
}

const initialState: ICardState = {
	cardsData: [],
	activeId: undefined,
	secondId: undefined,
	maxActiveCards: 3,
};

export default (state = initialState, action: IAction<ICardState>) => {
	switch (action.type) {
		case CardActions.setActive: {
			return { ...state, activeId: action.payload.activeId };
		}
		case CardActions.setSecond: {
			return { ...state, secondId: action.payload.secondId };
		}
		case CardActions.setCards: {
			state.cardsData = action.payload as ICardData[];
			return { ...state };
		}
		case CardActions.set: {
			return { ...state, ...action.payload };
		}
		case CardActions.removeSwipedCard: {
			const id = action.payload as number;
			return { ...state, cardsData: state.cardsData?.filter((card, idx) => idx !== 0) };
		}
		default: {
			return state;
		}
	}
};
