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
import { useDispatch } from "react-redux";
import { likedPostsHandler } from "../../../helpers/likedPostsHandler";
import { PostsList } from "../../../components/PostsList/PostsList";
import {
  deleteUserPhoto,
  addUserPhoto,
} from "../../../helpers/DeleteUserPhoto";
import { auth } from "../../../firebase/config";
import { AvatarPicker } from "../../../components/AvatarPicker/AvatarPicker";
import { handleImagePicker } from "../../../helpers/imagePicker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

const background = require("../../../assets/img.png");

export const ProfileScreen = ({ navigation }) => {
  const [initPostsArray, setInitPostsArray] = useState([]);
  const [newUserPhoto, setNewUserPhoto] = useState(null);
  const [updatedPostsArray, setUpdatedPostsArray] = useState([]);

  const dispatch = useDispatch();

  const { uid, displayName, photoURL } = auth.currentUser;

  const getAllUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", uid));
    await onSnapshot(q, (snapshot) => {
      setInitPostsArray(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  const uploadedUserImage = async (login, avatar) => {
    const storageRef = ref(storage, `usersAvatars/${login}1.jpg`);
    const response = await fetch(avatar);
    const uploadedFile = await response.blob();
    await uploadBytes(storageRef, uploadedFile);

    const photoUrl = await getDownloadURL(
      ref(storage, `usersAvatars/${login}1.jpg`)
    );
    return photoUrl;
  };

  const getUserPhoto = async () => {
    const result = await handleImagePicker();
    setNewUserPhoto(result);
    const login = displayName;
    const photoForDownload = await uploadedUserImage(login, result);
    addUserPhoto(photoForDownload);

    console.log("auth.currentUs", auth.currentUser);
  };

  useEffect(() => {
    getAllUserPosts();
  }, []);

  useEffect(() => {
    setUpdatedPostsArray(likedPostsHandler(initPostsArray, uid));
  }, [initPostsArray]);

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.profileContainer}>
          {photoURL ? (
            <View style={styles.profilePhotoWrapper}>
              <Image style={styles.profilePhoto} source={{ uri: photoURL }} />
              <TouchableOpacity
                style={styles.profilePhotoBtn}
                onPress={deleteUserPhoto}
              >
                <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ) : (
            <AvatarPicker getUserPhoto={getUserPhoto} avatar={newUserPhoto} />
          )}
          <TouchableOpacity style={styles.profileLogoutBtn}>
            <MaterialIcons
              name="logout"
              size={24}
              color="#BDBDBD"
              onPress={() => logOut()}
            />
          </TouchableOpacity>
          <Text style={styles.profileNickName}>{displayName}</Text>
          <PostsList
            updatedPostsArray={updatedPostsArray}
            initPostsArray={initPostsArray}
            userId={uid}
            navigation={navigation}
            isProfileScreen={true}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
