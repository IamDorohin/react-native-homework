import { EvilIcons, AntDesign, Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

import styles from "./DefaultScreen.styled";

const userPhoto = require("../../../assets/photo.png");

export const DefaultScreen = ({ navigation }) => {
  const [postsArray, setPostsArray] = useState([]);

  const getAllPosts = () => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPostsArray(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log("postsArray", postsArray);
  return (
    <View style={styles.postsContainer}>
      {postsArray && (
        <>
          <FlatList
            data={postsArray}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View title={item.title} style={styles.post}>
                <View>
                  <Image source={{ uri: item.userPhoto }} />
                  <Text>{userPhoto.nickName}</Text>
                  <Text>{}</Text>
                </View>
                <Image source={{ uri: item.photo }} style={styles.photo} />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.descriptionContainer}>
                  <View style={styles.descriptionStats}>
                    <TouchableOpacity
                      style={styles.descriptionItem}
                      onPress={() => {
                        navigation.navigate("Comments", {
                          data: item,
                        });
                      }}
                    >
                      <EvilIcons name="comment" size={24} color="#BDBDBD" />
                      <Text style={{ color: "#212121", marginLeft: 5 }}>
                        {item.commentsNumber}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => addLike(item.id)}
                      style={{ ...styles.descriptionItem, marginLeft: 25 }}
                    >
                      <AntDesign name="like2" size={18} color="#BDBDBD" />
                      <Text style={{ color: "#212121", marginLeft: 5 }}>
                        {item.likesNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.descriptionItem}
                    onPress={() => {
                      navigation.navigate("Map", { data: item.coords });
                    }}
                  >
                    <EvilIcons name="location" size={24} color="#BDBDBD" />
                    <Text style={styles.descriptionItemText}>
                      {item.location}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}
      <View>
        <Feather
          onPress={() => setPostsArray([])}
          name="trash-2"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
};
