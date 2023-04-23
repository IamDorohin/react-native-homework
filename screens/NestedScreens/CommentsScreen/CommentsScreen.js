import { AntDesign } from "@expo/vector-icons";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
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
  const [newComment, setNewComment] = useState("");

  console.log("route", route);
  const { id, photo } = route.params.data;

  const newCommentHandler = (comment) => {
    setNewComment(comment);
  };

  const addComment = async () => {
    // const docRef = doc(db, "posts", id);
    // const currentPost = await getDoc(docRef);
    // const messageRef = addDoc(db, "posts", id, "comments");
    // console.log("messageRef", messageRef);
    try {
      const docRef = await addDoc(collection(db, "posts", id, "comments"), {
        newComment,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // const getAllComments = async () => {
  //   await onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
  //     snapshot.docs.forEach((doc) =>
  //       setPostsArray([{ ...doc.data(), id: doc.id }])
  //     );
  //   });
  // };

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

  const submitHandler = async () => {
    addComment();
    setNewComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <View style={styles.screenContainer}>
        <View style={styles.innerContainer}>
          <Image style={styles.photo} source={{ uri: photo }} />
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(value) => newCommentHandler(value)}
              onEndEditing={() => showKeyboardHandler()}
              onFocus={() => activeInputHandler()}
              placeholder={"Write a comment..."}
              placeholderTextColor={"#BDBDBD"}
              style={styles.input}
              value={newComment}
            />
            <TouchableOpacity style={styles.commentBtn} onPress={submitHandler}>
              <AntDesign name="up" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
