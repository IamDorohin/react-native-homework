import MapView, { Marker } from "react-native-maps";
import styles from "./MapScreen.styled";

export const MapScreen = ({ route }) => {
  console.log("mapScreen", route);
  const latitude = route.params.data.coords.coords.latitude;
  const longitude = route.params.data.coords.coords.longitude;
  console.log("latitude", latitude);
  console.log("longitude", longitude);
  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={{
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        latitudeDelta: 0.001,
        longitudeDelta: 0.006,
      }}
    >
      <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
    </MapView>
  );
};
