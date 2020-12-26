import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, useWindowDimensions } from 'react-native';

const image: string = 'https://via.placeholder.com/720x1280';

interface IDummy {
  index: number;
  uri: string;
}

const dummyData: Array<IDummy> = Array(12)
  .fill({})
  .map((_, index) => ({ index, uri: image }));
console.log(dummyData);

const HomeScreen = (): JSX.Element => {
  const { width, height } = useWindowDimensions();
  console.log(width, height);
  return (
    <FlatList
      data={dummyData}
      keyExtractor={({ index }) => index.toString()}
      contentContainerStyle={styles.container}
      inverted
      renderItem={({ item: { uri }, index }) => (
        <ImageBackground
          key={index}
          style={styles.image}
          //   imageStyle={[styles.image, index === 0 && styles.toRight]}
          source={{ uri }}>
          <Text>Helloooooooo</Text>
        </ImageBackground>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
