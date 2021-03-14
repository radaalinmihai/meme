import React from "react";
import { StyleSheet } from "react-native";
import Card from "../../components/home/Card";
import {HomeWrapper} from "../../components/styles";

const image: string = "https://picsum.photos/200/300";

interface IDummy {
  index: number;
  uri: string;
}

const dummyData: Array<IDummy> = Array(12)
  .fill({})
  .map((_, index) => ({ index, uri: image }));

const MAX: number = 3;
const HomeScreen = (): JSX.Element => {
  return (
    <HomeWrapper>
      {dummyData.slice(0, MAX).map(dummy => <Card key={dummy.index} src={dummy.uri} />)}
    </HomeWrapper>
  );
};

export default HomeScreen;
