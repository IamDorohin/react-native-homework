import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  Feather,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, addDoc, Timestamp } from "firebase/firestore";
import { app } from "../../../firebase/config";
import styles from "./ProfileScreen.styled";
import { db } from "../../../firebase/config";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";

const auth = getAuth(app);

const background = require("../../../assets/img.png");

export const ProfileScreen = ({ navigation }) => {
  const [postsArray, setPostsArray] = useState([]);
  const [likesNumber, setLikesNumber] = useState(0);

  const dispatch = useDispatch();

  const { userId, nickName } = useSelector((state) => state.auth);

  const getCurrentUser = () => {
    const user = auth.currentUser;
    console.log("userInfo", user);
  };

  const getAllPosts = () => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      setPostsArray(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getCurrentUser();
    getAllPosts();
  }, []);

  const addLike = async (id) => {
    try {
      const docRef = await addDoc(collection(db, "posts", id, "likes"), {
        createdAt: new Timestamp.now().toMillis(),
        userId: userId,
        userNickName: nickName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateLikesNumber = async () => {
    const postsCollectionRef = doc(db, "posts", id);
    await updateDoc(postsCollectionRef, {
      commentsNumber,
    });
  };

  const logOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePhotoWrapper}>
            <Image style={styles.profilePhoto} />
            <TouchableOpacity style={styles.profilePhotoBtn}>
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
          <Text style={styles.profileNickName}>Kostiantyn Dorohin</Text>
          <FlatList
            data={postsArray}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View title={item.title} style={styles.post}>
                {/* <View>
                  <Image source={{ uri: item.userPhoto }} />
                  <Text>{userPhoto.nickName}</Text>
                  <Text>{}</Text>
                </View> */}
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
                      <EvilIcons name="comment" size={24} color="#BDBDBD" />
                      <Text style={{ color: "#212121", marginLeft: 5 }}>
                        {item.commentsNumber}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => addLike(item.id)}
                      style={{ ...styles.descriptionItem, marginLeft: 25 }}
                    >
                      <AntDesign name="like2" size={18} color="#BDBDBD" />
                      <Text style={{ color: "#212121", marginLeft: 5 }}>0</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.descriptionItem}
                    onPress={() => {
                      navigation.navigate("Map", { data: item.coords });
                    }}
                  >
                    <EvilIcons name="location" size={24} color="#BDBDBD" />
                    <Text style={styles.descriptionItemText}>
                      {item.location}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
