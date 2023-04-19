import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  innerContainer: {
    paddingTop: 32,
    alignItems: "center",
    marginHorizontal: 16,
    height: "100%",
  },
  photo: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  inputContainer: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  commentBtn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});

export default styles;
