import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

import styles from "./DefaultScreen.styled";

const userPhoto = require("../../../assets/photo.png");

export const DefaultScreen = ({ navigation }) => {
  const [postsArray, setPostsArray] = useState([]);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.docs.forEach((doc) =>
        setPostsArray({ ...doc.data(), id: doc.id })
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
          <View style={styles.userInfo}>
            <Image source={userPhoto} style={styles.userPhoto} />
            <View>
              <Text style={{ color: "#212121" }}>Kostiantyn Dorohin</Text>
              <Text style={{ color: "rgba(33, 33, 33, 0.8)" }}>
                iamdorohin@gmail.com
              </Text>
            </View>
          </View>
          <FlatList
            data={postsArray}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View title={item.title} style={styles.post}>
                <Image source={{ uri: item.photo }} style={styles.photo} />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.descriptionContainer}>
                  <TouchableOpacity
                    style={styles.descriptionItem}
                    // onPress={() => {
                    //   navigation.navigate("Comments", {
                    //     data: route.params,
                    //   });
                    // }}
                  >
                    <EvilIcons name="comment" size={24} color="#BDBDBD" />
                    <Text style={{ color: "#212121", marginLeft: 5 }}>0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.descriptionItem}
                    // onPress={() => {
                    //   navigation.navigate("Map", { data: route.params });
                    // }}
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
