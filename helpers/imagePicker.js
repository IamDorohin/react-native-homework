import * as ImagePicker from "expo-image-picker";

export const pickImage = async (setState, value) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setState((prevState) => ({
      ...prevState,
      value: result.assets[0].uri,
    }));
  }
};
