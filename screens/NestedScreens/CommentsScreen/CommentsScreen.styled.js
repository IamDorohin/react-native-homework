import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    backgroundColor: "#fff",
  },
  innerContainer: {
    paddingTop: 32,
    alignItems: "center",
    marginHorizontal: 16,
  },
  photo: {
    height: 240,
    width: "100%",
    marginHorizontal: 16,
    borderRadius: 8,
  },
  cameraIcon: {
    position: "absolute",
    alignSelf: "center",
    top: 90,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    // backgroundColor: "teal",
  },
  cameraContainerDescription: {
    marginTop: 8,
    color: "#BDBDBD",

    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  input: {
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  locationIcon: {
    position: "absolute",
    bottom: 15,
    left: -5,
  },

  submitBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
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
  deleteBtn: {
    position: "absolute",
    alignSelf: "center",
    bottom: 34,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default styles;
