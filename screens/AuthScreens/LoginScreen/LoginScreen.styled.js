import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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

export default styles;
