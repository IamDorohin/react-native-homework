import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Image,
  Text,
  TextInput,
} from "react-native";
import styles from "./CreatePostScreen.styled";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  photo: null,
  title: "",
  location: "",
};

export const CreatePostScreen = ({ navigation }) => {
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

  const inputValueHandler = (input, value) => {
    setInputValue((prevState) => ({ ...prevState, [input]: value }));
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
    navigation.navigate("Posts");
    setInputValue(initialState);
  };

  console.log(inputValue.photo);

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <View
        style={{
          flex: 1,
          paddingTop: 32,
          backgroundColor: "#fff",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={{ ...styles.form, marginBottom: isShowKeyboard ? -180 : 0 }}
          >
            <View style={styles.photoContainer} onPress={pickImage}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.photoPicker}
                onPress={pickImage}
              >
                {inputValue.photo && (
                  <Image
                    style={styles.photo}
                    source={{ uri: inputValue.photo }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.5}
                style={{
                  ...styles.photoPickerIcon,
                  backgroundColor: inputValue.photo
                    ? "rgba(255, 255, 255, 0.3)"
                    : "#fff",
                }}
              >
                <FontAwesome
                  name="camera"
                  size={24}
                  color={inputValue.photo ? "#fff" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.photoContainerDescription}>
              {!inputValue.photo ? "Upload photo" : "Change photo "}
            </Text>
            <TextInput
              onFocus={() => activeInputHandler("title")}
              onChangeText={(value) => inputValueHandler("title", value)}
              onEndEditing={() => showKeyboardHandler()}
              value={inputValue.title}
              style={{
                ...styles.input,
                borderColor: activeInput === "title" ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder={"Title..."}
              placeholderTextColor={"#BDBDBD"}
              marginTop={48}
            />
            <View>
              <TextInput
                onFocus={() => activeInputHandler("location")}
                onChangeText={(value) => inputValueHandler("location", value)}
                onEndEditing={() => showKeyboardHandler()}
                value={inputValue.location}
                style={{
                  ...styles.input,
                  paddingLeft: 24,
                  borderColor:
                    activeInput === "location" ? "#FF6C00" : "#E8E8E8",
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
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              setInputValue(initialState);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
