import { AntDesign } from "@expo/vector-icons";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./AvatarPicker.styled";

export const AvatarPicker = ({ getUserPhoto, avatar }) => {
  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.avatarPicker}
        onPress={() => getUserPhoto()}
      >
        {avatar && <Image style={styles.userAvatar} source={{ uri: avatar }} />}
      </TouchableOpacity>
      <AntDesign
        style={styles.avatarPickerIcon}
        name="pluscircleo"
        size={24}
        color={"#FF6C00"}
      />
    </View>
  );
};
