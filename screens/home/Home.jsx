import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { Details } from "./Details";

const Home = () => {
  const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      paddingBottom: 69,
    },
  });
  return (
    <>
      <Navbar />
      <View className="flex justify-center items-center w-full h-full">
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {Details.map((item) => {
            return <Card key={item.id} id={item.id} url={item.url} title={item.title} description={item.description} />;
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
