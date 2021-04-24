import { ICardState } from "components/home/CardReducer";
import { useSelector } from "react-redux";

export const useCard = () => useSelector(({ Card }) => Card as ICardState);
