import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  post: {
    marginHorizontal: 16,
    marginBottom: 35,
  },
  userInfo: {
    justifyContent: "flex-start",
    flexDirection: "row",
    // alignItems: "center",
    marginBottom: 32,
  },
  userInfoDescr: { justifyContent: "center" },
  userPhoto: {
    height: 60,
    width: 60,
    borderRadius: 16,
    marginRight: 10,
  },
  nickName: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
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
