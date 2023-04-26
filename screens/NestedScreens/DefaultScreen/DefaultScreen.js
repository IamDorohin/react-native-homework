import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { likedPostsHandler } from "../../../helpers/likedPostsHandler";
import { View } from "react-native";
import styles from "./DefaultScreen.styled";
import { PostsList } from "../../../components/PostsList/PostsList";

export const DefaultScreen = ({ navigation }) => {
  const [initPostsArray, setInitPostsArray] = useState([]);
  const [updatedPostsArray, setUpdatedPostsArray] = useState([]);

  const { userId, nickName, userPhoto, userEmail } = useSelector(
    (state) => state.auth
  );
  const getAllPosts = () => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setInitPostsArray(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    setUpdatedPostsArray(likedPostsHandler(initPostsArray, userId));
  }, [initPostsArray]);

  return (
    <View style={styles.postsContainer}>
      {updatedPostsArray && (
        <PostsList
          updatedPostsArray={updatedPostsArray}
          initPostsArray={initPostsArray}
          userId={userId}
          nickName={nickName}
          userPhoto={userPhoto}
          userEmail={userEmail}
          navigation={navigation}
        />
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
