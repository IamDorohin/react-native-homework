import { EvilIcons, AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { addLikeHandler } from "../../helpers/addLikeHandler";
import styles from "./PostsList.styled";

export const PostsList = ({
  navigation,
  updatedPostsArray,
  initPostsArray,
  userId,
  isProfileScreen,
}) => {
  return (
    <FlatList
      data={updatedPostsArray}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View title={item.title} style={styles.post}>
          {!isProfileScreen ? (
            <View style={styles.userInfo}>
              <Image
                style={styles.userPhoto}
                source={{ uri: item.userPhoto }}
              />
              <View style={styles.userInfoDescr}>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text style={styles.userEmail}>{item.userEmail}</Text>
              </View>
            </View>
          ) : null}
          <Image source={{ uri: item.photo }} style={styles.photo} />
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionStats}>
              <TouchableOpacity
                style={styles.descriptionItem}
                onPress={() => {
                  navigation.navigate("Comments", {
                    data: item,
                  });
                }}
              >
                <FontAwesome
                  name={item.commentsNumber === 0 ? "comment-o" : "comment"}
                  size={18}
                  color={item.commentsNumber === 0 ? "#BDBDBD" : "#FF6C00"}
                />
                <Text style={{ color: "#212121", marginLeft: 5 }}>
                  {item.commentsNumber}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addLikeHandler(initPostsArray, item.id, userId)}
                style={{ ...styles.descriptionItem, marginLeft: 25 }}
              >
                <AntDesign
                  name="like2"
                  size={18}
                  color={!item.isLiked ? "#BDBDBD" : "#FF6C00"}
                />
                <Text style={{ color: "#212121", marginLeft: 5 }}>
                  {item.likesNumber}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.descriptionItem}
              onPress={() => {
                navigation.navigate("Map", { data: item.coords });
              }}
            >
              <EvilIcons name="location" size={24} color="#BDBDBD" />
              <Text style={styles.descriptionItemText}>{item.location}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};
