import MapView, { Marker } from "react-native-maps";
import styles from "./MapScreen.styled";

export const MapScreen = ({ route }) => {
  const latitude = route.params.data.latitude;
  const longitude = route.params.data.longitude;

  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.006,
      }}
    >
      <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
    </MapView>
  );
};
