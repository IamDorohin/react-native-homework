import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
});

export default styles;
