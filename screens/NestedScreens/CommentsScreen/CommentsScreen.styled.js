import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  photoContainer: {
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
  commentsContainer: {
    paddingTop: 32,
    marginHorizontal: 16,
  },
  currentUserComment: {
    flexDirection: "row-reverse",
    flexWrap: "nowrap",
    paddingRight: 60,
    width: "100%",
    marginBottom: 24,
  },
  currentUserCommentDescr: {
    width: "100%",
    marginRight: 16,
    backgroundColor: "teal",
    borderRadius: 6,
    borderTopRightRadius: 0,
    padding: 10,
  },
  currentUserNickName: {
    // textAlign: "left",
    fontWeight: "bold",
    marginBottom: 6,
  },
  currentUserText: {
    marginBottom: 6,
  },
  currentUserCommentDate: {},
  otherUserComment: {
    textAlign: "right",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingRight: 60,
    width: "100%",
    marginBottom: 24,
  },
  commentUserPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
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
