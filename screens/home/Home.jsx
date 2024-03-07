import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import { Details } from "./Details";

const GET_ALL_BLOG_POSTS = gql`
  query {
    getAllBlogPost {
      id
      title
      body
      image
      author
      createdAt
      updatedAt
    }
  }
`;

const Home = () => {
  const [details, setDetails] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);

  useEffect(() => {
    if (data) {
      setDetails(data.getAllBlogPost);
    }
    console.log("is loading", loading);
    console.log("is data", data);
    console.log("is error", error);
  }, []);

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
          {error && (
            <View className="w-full h-full flex justify-center items-center">
              <Text>Error fetching data: {error.message}</Text>
            </View>
          )}
          {loading && (
            <View className="w-full h-full flex justify-center items-center">
              <Text>Loading...</Text>
            </View>
          )}
          {details.length > 0 &&
            details.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                url={item.image}
                title={item.title}
                description={item.body}
              />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
