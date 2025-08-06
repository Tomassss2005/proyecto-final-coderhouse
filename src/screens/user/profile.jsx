import { useDispatch, useSelector } from "react-redux";
import { Alert, Image, Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { colors } from "../../global/colors";
import { usePutProfilePictureMutation } from "../../store/user/userApi";
import { setProfilePicture } from "../../features/user/userSlice";
import { clearSession } from "../../db/index"
import { clearUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import CameraIcon from "../../components/cameraIcon";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';


const Profile = () => {

    const user = useSelector(state => state.userReducer.user);
    const localId = useSelector(state => state.userReducer.localId);
    const image = useSelector(state => state.userReducer.profilePicture);
    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();
    const [location, setLocation] = useState(null);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const [address, setAddress] = useState("")

    const dispatch = useDispatch();


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        });

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setProfilePicture(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Querés cerrar sesión?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Sí',
                    onPress: async () => {
                        try {
                            await clearSession()
                            dispatch(clearUser())
                        } catch (error) {
                            logError(error);
                        }
                    },
                },
            ],
            { cancelable: false }
        )
    }


    useEffect(() => {
        let locationSubscription;

        const startLocationUpdates = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setLocationPermissionDenied(true);
                    setLocationLoaded(true);
                    return;
                }

                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 5000,
                        distanceInterval: 10,
                    },
                    async (loc) => {
                        setLocation(loc);
                        try {
                            const response = await fetch(
                                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`
                            );
                            const data = await response.json();
                            setAddress(data.results[0]?.formatted_address || "Ubicación obtenida");
                        } catch (geoError) {
                            logError("Error al obtener dirección:", geoError);
                        }
                    }
                );
            } catch (error) {
                logError("Error al iniciar ubicación:", error);
            } finally {
                setLocationLoaded(true);
            }
        };

        startLocationUpdates();

        return () => {
            if (locationSubscription) {
                locationSubscription.remove();
            }
        };
    }, []);

    function logError(...args) {
        if (__DEV__) {
            console.error(...args);
        }
    }

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode="cover" style={styles.image} />
                        :
                        <Text style={styles.textProfile}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]}>
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.emailUser}>Email: {user}</Text>
            {
                user
                &&
                <Pressable
                    onPress={handleLogout}
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                >
                    <Text style={styles.text}>Cerrar sesión</Text>
                </Pressable>
            }
            <View style={styles.mapContainer}>
                {
                    location
                        ?
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Lugar Geek"} />
                        </MapView>
                        :
                        (
                            locationLoaded
                                ?
                                <Text style={{ textAlign: "center", marginTop: 40, fontSize: 16 }}>Hubo un problema al obtener la ubicación</Text>
                                :
                                <ActivityIndicator size="large" color={colors.blue} />
                        )
                }
            </View>
            <View style={styles.placeDescriptionContainer}>
                <View>
                    <Text>{address || ""}</Text>
                </View>
            </View>
        </View>
    )
}

export default Profile;


const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 128,
        height: 128,
        borderRadius: 128,
    },
    textProfile: {
        color: colors.white,
        fontSize: 48
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    emailUser: {
        paddingVertical: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#457",
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonPressed: {
        transform: [{ scale: 0.98 }],
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    mapContainer: {
        width: '100%',
        height: 240,
        overflow: "hidden",
        marginBottom: 16,
        marginTop: 15,
        borderRadius: 6,
    },
    map: {
        height: 240,

    },
    mapTitle: {
        fontWeight: '700'
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    }
})