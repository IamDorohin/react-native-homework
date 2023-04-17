import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { View, FlatList, Image, Text } from "react-native";

import styles from "./PostsScreen.styled";

export const PostsScreen = ({ route }) => {
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPostsArray((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.posts}>
      {postsArray && (
        <FlatList
          data={postsArray}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View title={item.title} style={styles.post}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <Text>{item.title}</Text>
              <View>
                <EvilIcons
                  // style={styles.locationIcon}
                  name="location"
                  size={24}
                  color="#BDBDBD"
                />
                <Text>{item.location}</Text>
              </View>
            </View>
          )}
        />
      )}
      <View>
        <Feather
          onPress={() => setPostsArray([])}
          name="trash-2"
          size={24}
          color="black"
          style={{ marginLeft: 20 }}
        />
      </View>
    </View>
  );
};
