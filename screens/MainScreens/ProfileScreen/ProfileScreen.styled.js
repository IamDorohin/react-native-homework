import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 147,
  },
  profileContainer: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
  },
  profilePhotoWrapper: { position: "absolute", alignSelf: "center", top: -60 },
  profilePhoto: {
    backgroundColor: "#FF6C00",
    borderColor: "black",
    borderWidth: 1,
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  profilePhotoBtn: {
    position: "absolute",
    top: 75,
    right: -11.5,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  profileLogoutBtn: {
    position: "absolute",
    top: 25,
    right: 20,
  },
  profileNickName: {
    marginBottom: 32,
    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontSize: 30,
    lineHeight: 35,
  },
  photo: {
    width: 340,
    height: 240,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
  },
  postTitle: {
    marginTop: 10,
    fontWeight: "bold",
    fontFamily: "roboto-Bold",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  descriptionContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  descriptionStats: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
  },
  descriptionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionItemText: {
    marginLeft: 5,
    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});

export default styles;
