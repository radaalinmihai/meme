import React from "react";
import { ICardProps } from "../../helpers/interfaces";
import {CardImage} from "../styles";

const Card = ({src}: ICardProps) => {
  return (
    <CardImage source={{uri: src}} />
  );
}

export default Card;
