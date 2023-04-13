import { useState } from "react";
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
import styles from "./LoginScreen.styled";

const background = require("../../../assets/img.png");

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
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
    Keyboard.dismiss();
    setActiveInput("");
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
              marginBottom: isShowKeyboard ? -230 : null,
            }}
          >
            <Text style={styles.title} size={25}>
              Sign in
            </Text>
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
              marginTop={33}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                onFocus={() => activeInputHandler("password")}
                onChangeText={(text) => inputValueHandler("password", text)}
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
              <Text style={styles.submitBtnTitle}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.signInLink}>
              <Text>You don't have an account?</Text>
              <Text
                onPress={() => navigation.navigate("Registration")}
                style={styles.link}
              >
                Sign up
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
