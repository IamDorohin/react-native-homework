import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 16,
    height: "100%",
  },
  cameraContainer: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  loaderBackground: { height: 240, width: "100%", borderRadius: 8 },
  loader: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  loaderTitle: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    top: 150,
  },
  loaderDescr: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    top: 170,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  photo: {
    height: 240,
    width: "100%",
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
