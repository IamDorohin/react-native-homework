import { useState } from "react";
import {
  StyleSheet,
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

const background = require("../assets/background.jpg");

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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    // height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // borderRadius: "25 25 0 0",
    paddingBottom: 144,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarPicker: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  userAvatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarPickerIcon: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },
  title: {
    marginTop: 32,

    fontFamily: "roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  input: {
    marginHorizontal: 16,
    minWidth: 343,
    height: 50,
    marginTop: 16,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 8,
    // borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  passwordContainer: {
    position: "relative",
    marginHorizontal: 16,
    height: 50,
    minWidth: 343,
  },
  password: {
    position: "absolute",
    top: 32,
    right: 32,
    color: "#1B4371",

    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  submitBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 43,
    marginHorizontal: 16,
    height: 50,
    minWidth: 343,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  submitBtnTitle: {
    color: "#fff",
    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  signInLink: {
    flexDirection: "row",
    marginTop: 16,

    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
});
