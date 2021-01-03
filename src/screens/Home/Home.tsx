import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const image: string = "https://picsum.photos/200/300";

interface IDummy {
  index: number;
  uri: string;
}

const dummyData: Array<IDummy> = Array(12)
  .fill({})
  .map((_, index) => ({ index, uri: image }));

const MAX: number = 3;
// Split these into their own components, for later
const HomeScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      {dummyData.slice(0, MAX).map(dummy => {
        return <ImageBackground
          key={dummy.index}
          style={[styles.image, dummy.index === MAX - 1 ? {transform: [{rotate: '-5.27deg'}]} : {}]}
          source={{ uri: dummy.uri }}
        >
          <Text style={{color: 'white'}}>jkgjfgjfgj</Text>
        </ImageBackground>;
      })}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignSelf: "center",
    width: "100%",
    padding: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    borderRadius: 30,
    overflow: "hidden"
  }
});

export default HomeScreen;
