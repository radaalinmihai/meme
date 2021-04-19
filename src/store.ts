import { combineReducers, createStore } from "redux";

import CardReducer from "./components/home/CardReducer";

const rootReducer = combineReducers({
	Card: CardReducer,
});

const store = createStore(rootReducer);

export default store;
