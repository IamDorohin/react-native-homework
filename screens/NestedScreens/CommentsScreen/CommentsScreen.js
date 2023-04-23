import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import {
  View,
  FlatList,
  Text,
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
  const [allComments, setAllComments] = useState([]);

  const { userId, nickName, userPhoto } = useSelector((state) => state.auth);
  console.log("route", route);
  console.log("allComments", allComments);

  const { id, photo } = route.params.data;

  const newCommentHandler = (comment) => {
    setNewComment(comment);
  };

  const addComment = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", id, "comments"), {
        newComment,
        createdAt: new Timestamp.now().toMillis(),
        userId: userId,
        userPhoto: userPhoto.toString(),
        userNickName: nickName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getAllComments = async () => {
    await onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
      snapshot.docs.forEach((doc) =>
        setAllComments([{ ...doc.data(), id: doc.id }])
      );
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

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
        <View style={styles.photoContainer}>
          <Image style={styles.photo} source={{ uri: photo }} />
        </View>
        {allComments && (
          <View style={styles.commentsContainer}>
            <FlatList
              data={allComments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={
                    item.userId === userId
                      ? styles.currentUserComment
                      : styles.otherUserComment
                  }
                >
                  <Image
                    source={{ uri: item.userPhoto }}
                    style={styles.commentUserPhoto}
                  />
                  <View style={styles.currentUserCommentDescr}>
                    <Text style={styles.currentUserNickName}>
                      {item.userNickName}
                    </Text>
                    <Text style={styles.currentUserText}>
                      {item.newComment}
                    </Text>
                    <Text style={styles.currentUserCommentDate}>
                      {item.createdAt}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
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
    </TouchableWithoutFeedback>
  );
};
