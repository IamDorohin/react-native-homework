import { View, Image } from "react-native";

import styles from "./CommentsScreen.styled";

export const CommentsScreen = ({ route }) => {
  console.log("route", route);
  return (
    <View style={styles.screenContainer}>
      <View style={styles.innerContainer}>
        <Image style={styles.photo} source={{ uri: route.params.data.photo }} />
      </View>
    </View>
  );
};
