import { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import styles from "./LoginScreen.styled";

const background = require("../../assets/background.jpg");

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState("");
  const [inputValue, setInputValue] = useState(initialState);

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
      <View style={{ flex: 1 }}>
        <ImageBackground source={background} style={styles.background}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -230 : 0,
              }}
            >
              <Text style={styles.title} size={25}>
                Sign in
              </Text>
              <TextInput
                onFocus={() => activeInputHandler("email")}
                inputMode={"email"}
                onChangeText={(value) => inputValueHandler("email", value)}
                value={inputValue.email}
                style={{
                  ...styles.input,
                  borderColor: activeInput === "email" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder={"Email"}
                placeholderTextColor={"#BDBDBD"}
                marginTop={33}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  onFocus={() => activeInputHandler("password")}
                  onChangeText={(value) => inputValueHandler("password", value)}
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
                <Text style={styles.submitBtnTitle}>Sign in</Text>
              </TouchableOpacity>
              <View style={styles.signInLink}>
                <Text>You don't have an account?</Text>
                <Text> Sign up</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
