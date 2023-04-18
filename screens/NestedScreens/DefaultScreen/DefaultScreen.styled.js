import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  post: {
    marginHorizontal: 16,
    marginBottom: 35,
  },
  userInfo: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userPhoto: {
    height: 60,
    width: 60,
    marginHorizontal: 16,
    borderRadius: 16,
    marginRight: 10,
  },
  photo: {
    width: 340,
    height: 240,
    borderRadius: 8,
  },
  postTitle: {
    marginTop: 10,
    fontFamily: "roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  descriptionContainer: {
    marginTop: 10,
    flexDirection: "row",
    // width: 350,
    justifyContent: "space-between",
    alignContent: "space-between",
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
