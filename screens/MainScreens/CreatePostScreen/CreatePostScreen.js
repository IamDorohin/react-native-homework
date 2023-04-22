import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const storage = getStorage();

const loaderGradient = require("../../../assets/loader-gradient.jpeg");

import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  View,
  ActivityIndicator,
  Image,
  Text,
  TextInput,
} from "react-native";
import styles from "./CreatePostScreen.styled";

const initialState = {
  title: "",
  location: "",
  id: "",
  coords: {},
};

export const CreatePostScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState("");
  const [inputValue, setInputValue] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [takenPhoto, setTakenPhoto] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();

    setIsLoadingPhoto(true);
    let { coords } = await Location.getCurrentPositionAsync({});
    setIsLoadingPhoto(false);

    setInputValue((prevState) => ({
      ...prevState,
      coords: coords,
    }));
    setTakenPhoto(uri);
  };

  const inputValueHandler = (input, value) => {
    setInputValue((prevState) => ({
      ...prevState,
      [input]: value,
      id: nanoid(),
    }));
  };

  const uploadedUserImage = async () => {
    const storageRef = ref(storage, `postsImages/${inputValue.id}.jpg`);
    const response = await fetch(takenPhoto);
    const uploadedFile = await response.blob();
    await uploadBytes(storageRef, uploadedFile);

    const photoUrl = await getDownloadURL(
      ref(storage, `postsImages/${inputValue.id}.jpg`)
    );

    setInputValue((prevState) => ({
      ...prevState,
    }));

    return photoUrl;
  };

  const createPost = async () => {
    const createdPhoto = await uploadedUserImage();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...inputValue,
        photo: createdPhoto,
        userId,
        nickName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const showKeyboardHandler = () => {
    setIsShowKeyboard(false);
    setActiveInput("");
    Keyboard.dismiss();
  };

  const activeInputHandler = (inputName) => {
    setIsShowKeyboard(true);
    setActiveInput(inputName);
  };

  const submitHandler = async () => {
    createPost();
    navigation.navigate("Posts");
    setInputValue(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={showKeyboardHandler}>
      <View
        style={{
          flex: 1,
          paddingTop: 32,
          backgroundColor: "#fff",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={{ ...styles.form, marginBottom: isShowKeyboard ? -180 : 0 }}
          >
            <View style={styles.cameraContainer}>
              {isLoadingPhoto ? (
                <View style={styles.loaderContainer}>
                  <Image
                    source={loaderGradient}
                    style={styles.loaderBackground}
                  />
                  <ActivityIndicator
                    style={styles.loader}
                    size="small"
                    color="#000"
                  />
                  <Text style={styles.loaderTitle}>Loading photo...</Text>
                  <Text style={styles.loaderDescr}>
                    You can still add title and location
                  </Text>
                </View>
              ) : (
                <Camera
                  style={styles.camera}
                  ref={setCamera}
                  onMountError={(error) => {
                    console.log("cammera error", error);
                  }}
                >
                  {takenPhoto && (
                    <Image style={styles.photo} source={{ uri: takenPhoto }} />
                  )}
                  <TouchableOpacity
                    onPress={takePhoto}
                    activeOpacity={0.5}
                    style={{
                      ...styles.cameraIcon,
                      backgroundColor: takenPhoto
                        ? "rgba(255, 255, 255, 0.3)"
                        : "#fff",
                    }}
                  >
                    <FontAwesome
                      name="camera"
                      size={24}
                      color={takenPhoto ? "#fff" : "#BDBDBD"}
                    />
                  </TouchableOpacity>
                </Camera>
              )}
            </View>
            <Text style={styles.cameraContainerDescription}>
              {!takenPhoto ? "Upload photo" : "Change photo"}
            </Text>
            <TextInput
              onFocus={() => activeInputHandler("title")}
              onChangeText={(value) => inputValueHandler("title", value)}
              onEndEditing={() => showKeyboardHandler()}
              value={inputValue.title}
              style={{
                ...styles.input,
                borderColor: activeInput === "title" ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder={"Title..."}
              placeholderTextColor={"#BDBDBD"}
              marginTop={48}
            />
            <View>
              <TextInput
                onFocus={() => activeInputHandler("location")}
                onChangeText={(value) => inputValueHandler("location", value)}
                onEndEditing={() => showKeyboardHandler()}
                value={inputValue.location}
                style={{
                  ...styles.input,
                  paddingLeft: 24,
                  borderColor:
                    activeInput === "location" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder={"Location..."}
                placeholderTextColor={"#BDBDBD"}
                marginTop={32}
              />
              <EvilIcons
                style={styles.locationIcon}
                name="location"
                size={24}
                color="#BDBDBD"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.submitBtn}
              onPress={submitHandler}
            >
              <Text style={styles.submitBtnTitle}>Create</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => {
              setInputValue(initialState);
              setTakenPhoto(null);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

// rules_version = '2';
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if false;
//     }
//   }
// }
