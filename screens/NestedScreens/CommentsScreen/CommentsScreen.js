import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
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
          <Image
            style={styles.photo}
            source={{ uri: route.params.data.photo }}
          />
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
