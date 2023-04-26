import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import styles from "./ProfileScreen.styled";
import { db } from "../../../firebase/config";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { likedPostsHandler } from "../../../helpers/likedPostsHandler";
import { PostsList } from "../../../components/PostsList/PostsList";
// import { DeleteUserPhoto } from "../../../helpers/DeleteUserPhoto";

const background = require("../../../assets/img.png");

export const ProfileScreen = ({ navigation }) => {
  const [initPostsArray, setInitPostsArray] = useState([]);
  const [updatedPostsArray, setUpdatedPostsArray] = useState([]);

  const dispatch = useDispatch();

  const { userId, nickName, userPhoto } = useSelector((state) => state.auth);

  const getAllUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (snapshot) => {
      setInitPostsArray(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getAllUserPosts();
  }, []);

  useEffect(() => {
    setUpdatedPostsArray(likedPostsHandler(initPostsArray, userId));
  }, [initPostsArray]);

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePhotoWrapper}>
            <Image style={styles.profilePhoto} source={{ uri: userPhoto }} />
            <TouchableOpacity
              style={styles.profilePhotoBtn}
              // onPress={DeleteUserPhoto(userId)}
            >
              <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileLogoutBtn}>
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => logOut()}
            />
          </TouchableOpacity>
          <Text style={styles.profileNickName}>{nickName}</Text>
          <PostsList
            updatedPostsArray={updatedPostsArray}
            initPostsArray={initPostsArray}
            userId={userId}
            navigation={navigation}
            isProfileScreen={true}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
