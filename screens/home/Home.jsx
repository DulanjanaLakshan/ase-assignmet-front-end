import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";

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
  const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      paddingBottom: 69,
    },
  });

  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);

  const [blogPosts, setBlogPosts] = useState([]);

  useState(() => {
    if (!loading && data) {
    //   setBlogPosts(data.getAllBlogPost);
    console.log(data.getAllBlogPost);
    }
  }, [loading, data]);

  return (
    <>
      <Navbar />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              url={post.image}
              title={post.title}
              description={post.body}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
