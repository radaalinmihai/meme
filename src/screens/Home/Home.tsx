import React, {useEffect, useState} from "react";

import Card from "../../components/home/Card";
import {HomeWrapper} from "../../components/styles";

const image = "https://picsum.photos/200/300";

interface IDummy {
  index: number;
  uri: string;
}

const dummyData: Array<IDummy> = Array(12)
  .fill({})
  .map((_, index) => ({index, uri: image}));

const MAX = 3;
const HomeScreen = (): JSX.Element => {
  const [mockData, setMockData] = useState<IDummy[]>(dummyData);
  useEffect(() => {
    console.log(mockData);
  }, [mockData]);
  const removeItem = (isFinished: boolean) => {
    if (isFinished) {
      setMockData((dummies) => {
        if (dummies.length <= MAX) {
          const dummiesClone = [...dummies];
          dummiesClone.pop();
          return dummiesClone;
        }
        return dummies.filter((dummy, idx) => idx !== MAX - 1);
      });
    }
  };
  const cardIsActive = (idx: number): boolean => idx === MAX - 1 || idx === mockData.length - 1;
  return (
    <HomeWrapper>
      {mockData.slice(0, MAX).map((dummy, idx) => (
        <Card
          key={dummy.index}
          removeItem={removeItem}
          active={cardIsActive(idx)}
          src={dummy.uri}
        />
      ))}
    </HomeWrapper>
  );
};

export default HomeScreen;
