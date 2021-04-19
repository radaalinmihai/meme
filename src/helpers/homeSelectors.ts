import { useSelector } from "react-redux";

import { ICardState } from "../components/home/CardReducer";

export const useCard = () => useSelector(({ Card }) => Card as ICardState);
