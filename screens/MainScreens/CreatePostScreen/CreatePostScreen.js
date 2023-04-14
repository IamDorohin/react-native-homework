import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  TextInput,
} from "react-native";
import styles from "./CreatePostScreen.styled";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const initialState = {
  photo: null,
  title: "",
  location: "",
};

export const CreatePostScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState("");
  const [inputValue, setInputValue] = useState(initialState);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setInputValue((prevState) => ({
        ...prevState,
        photo: result.assets[0].uri,
      }));
    }
  };

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false);
    setActiveInput("");
    Keyboard.dismiss();
  };

  const activeInputHandler = (inputName) => {
    setIsShowKeyboard(true);
    setActiveInput(inputName);
  };

  const submitHandler = () => {
    console.log(inputValue);
    setInputValue(initialState);
  };

  return (
    <TouchableWithoutFeedback>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={{ ...styles.form, marginBottom: isShowKeyboard ? -180 : 0 }}
          >
            <View style={styles.photoContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                // style={}
                onPress={pickImage}
              >
                {inputValue.photo && (
                  <Image
                    // style={}
                    source={{ uri: inputValue.photo }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.photoPicker}>
                <FontAwesome
                  name="camera"
                  size={24}
                  color={inputValue.photo ? "#fff" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.photoContainerDescription}>Download photo</Text>
            <TextInput
              onFocus={() => activeInputHandler("login")}
              onChangeText={(value) => inputValueHandler("login", value)}
              onEndEditing={() => showKeyboardHandler()}
              value={inputValue.login}
              style={{
                ...styles.input,
                borderColor: activeInput === "login" ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder={"Title..."}
              placeholderTextColor={"#BDBDBD"}
              marginTop={48}
            />
            <View>
              <TextInput
                onFocus={() => activeInputHandler("email")}
                onChangeText={(value) => inputValueHandler("email", value)}
                onEndEditing={() => showKeyboardHandler()}
                value={inputValue.email}
                style={{
                  ...styles.input,
                  paddingLeft: 24,
                  borderColor: activeInput === "email" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder={"Location..."}
                placeholderTextColor={"#BDBDBD"}
                marginTop={32}
              />
              <EvilIcons
                style={styles.locationIcon}
                name="location"
                size={24}
                color="#BDBDBD"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.submitBtn}
              onPress={submitHandler}
            >
              <Text style={styles.submitBtnTitle}>Create</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
