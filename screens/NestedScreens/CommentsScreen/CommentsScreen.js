import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import styles from "./CommentsScreen.styled";

export const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  console.log("route", route);
  const { id, photo } = route.params.data;

  //   try {
  //   const docRef = await addDoc(collection(db, "posts"), {
  //     ...inputValue,
  //     photo: createdPhoto,
  //     userId,
  //     nickName,
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  //   }

  const addComment = async () => {
    try {
      const ref = await collection(db, "posts");
      const test = await addDoc(collection(ref), {});
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", e);
    }

    //   doc(id).collection('comments').ad
    // await onSnapshot(collection(db, "posts"), (snapshot) => {
    //   snapshot.docs.forEach((doc) =>
    //     setPostsArray([{ ...doc.data(), id: doc.id }])
    //   );
    // });
  };
  addComment();
  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  const activeInputHandler = () => {
    setIsShowKeyboard(true);
  };

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <View style={styles.screenContainer}>
        <View style={styles.innerContainer}>
          <Image style={styles.photo} source={{ uri: photo }} />
          <View style={styles.inputContainer}>
            <TextInput
              onFocus={() => activeInputHandler()}
              onEndEditing={() => showKeyboardHandler()}
              style={styles.input}
              placeholder={"Write a comment..."}
              placeholderTextColor={"#BDBDBD"}
            />
            <TouchableOpacity style={styles.commentBtn}>
              <AntDesign name="up" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
