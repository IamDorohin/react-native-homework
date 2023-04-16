import { useState, useEffect } from "react";
import { View, FlatList, Image, Text } from "react-native";

export const PostsScreen = ({ route }) => {
  const [postsArray, setPostsArray] = useState([]);

  const newPost = route.params;

  useEffect(() => {
    if (newPost) setPostsArray((prevState) => [...prevState, newPost]);
  }, [newPost]);

  console.log("route", newPost);
  return (
    <View>
      <FlatList
        data={postsArray}
        renderItem={({ item }) => (
          <View title={item.title}>
            <Image />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
