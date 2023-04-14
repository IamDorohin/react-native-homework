import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import styles from "./RegistrationScreen.styled";

const background = require("../../../assets/img.png");

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: null,
};

export const RegistrationScreen = ({ navigation }) => {
  const [isShowPassword, setIsShowPassword] = useState(true);
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
        avatar: result.assets[0].uri,
      }));
    }
  };

  const inputValueHandler = (input, value) => {
    setInputValue((prevState) => ({ ...prevState, [input]: value }));
  };

  const activeInputHandler = (inputName) => {
    setIsShowKeyboard(true);
    setActiveInput(inputName);
  };

  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false);
    setActiveInput("");
    Keyboard.dismiss();
  };

  const submitHandler = () => {
    console.log(inputValue);
    setInputValue(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Image source={background} style={styles.background} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? -180 : 0,
            }}
          >
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.avatarPicker}
                onPress={pickImage}
              >
                {inputValue.avatar && (
                  <Image
                    style={styles.userAvatar}
                    source={{ uri: inputValue.avatar }}
                  />
                )}
              </TouchableOpacity>
              <AntDesign
                style={styles.avatarPickerIcon}
                name="pluscircleo"
                size={24}
                color={"#FF6C00"}
              />
            </View>
            <Text style={styles.title} size={25}>
              Registration
            </Text>
            <TextInput
              onFocus={() => activeInputHandler("login")}
              onChangeText={(value) => inputValueHandler("login", value)}
              onEndEditing={() => showKeyboardHandler()}
              value={inputValue.login}
              style={{
                ...styles.input,
                borderColor: activeInput === "login" ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder={"Login"}
              placeholderTextColor={"#BDBDBD"}
              marginTop={33}
            />
            <TextInput
              onFocus={() => activeInputHandler("email")}
              inputMode={"email"}
              onChangeText={(value) => inputValueHandler("email", value)}
              onEndEditing={() => showKeyboardHandler()}
              value={inputValue.email}
              style={{
                ...styles.input,
                borderColor: activeInput === "email" ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder={"Email"}
              placeholderTextColor={"#BDBDBD"}
              marginTop={16}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                onFocus={() => activeInputHandler("password")}
                onChangeText={(value) => inputValueHandler("password", value)}
                onEndEditing={() => showKeyboardHandler()}
                value={inputValue.password}
                style={{
                  ...styles.input,
                  borderColor:
                    activeInput === "password" ? "#FF6C00" : "#E8E8E8",
                }}
                secureTextEntry={isShowPassword}
                placeholder={"Password"}
                placeholderTextColor={"#BDBDBD"}
              />
              <Text
                style={styles.password}
                onPress={() => showPasswordHandler()}
              >
                Show
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.submitBtn}
              onPress={submitHandler}
            >
              <Text style={styles.submitBtnTitle}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.signInLink}>
              <Text>Already have an account?</Text>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={styles.link}
              >
                Sign in
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
