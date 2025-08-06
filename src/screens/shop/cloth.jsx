const { StyleSheet, Text, ScrollView, Image, View, Pressable, useWindowDimensions, TextInput, Alert, ActivityIndicator } = require("react-native");
import { colors } from "../../global/colors";
import { addItems } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


function Cloth({ route }) {

    const { cloth } = route.params
    const { width } = useWindowDimensions()
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch()

    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>Ocurrió un error al cargar los productos.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{cloth.title}</Text>
            <Text style={styles.price}>${cloth.price}</Text>
            {
                cloth.discount > 0 &&
                <Text style={{ marginTop: 5, fontSize: 16 }}>${cloth.price} Precio original
                    <Text style={{ color: "red" }}> -{cloth.discount}%</Text>
                </Text>
            }

            <View style={{ padding: 0 }}>
                <Image
                    source={{ uri: cloth.image }}
                    alt={cloth.title}
                    width='100%'
                    height={width * .9}
                    resizeMode="contain"
                    style={{ marginTop: 40 }}
                />
                {isLoading && <ActivityIndicator size="large" color={colors.blue} />}
            </View>
            <Text style={styles.description}>{cloth.description}</Text>

            <View style={styles.subtractAndAdd}>
                <Pressable onPress={handleDecrement}>
                    <Text style={{ fontSize: 30 }}>-</Text>
                </Pressable>

                <TextInput style={{ fontSize: 20 }}>{quantity}</TextInput>

                <Pressable onPress={handleIncrement}>
                    <Text style={{ fontSize: 30 }}>+</Text>
                </Pressable>
            </View>

            <Pressable
                onPress={() => {
                    Alert.alert(
                        'Confirmar',
                        `¿Querés añadir "${cloth.title}" (${quantity}) al carrito?`,
                        [
                            {
                                text: 'No',
                                style: 'cancel',
                            },
                            {
                                text: 'Sí',
                                onPress: () => {
                                    dispatch(addItems({ cloth, quantity }));
                                    setQuantity(1);
                                    Alert.alert(
                                        'Producto añadido al carrito de compras',
                                        `${cloth.title}, ${quantity}`,
                                        [{ text: 'OK' }]
                                    );
                                },
                            },
                        ],
                        { cancelable: false }
                    );
                }}
                style={({ pressed }) => [
                    { opacity: pressed ? 0.85 : 1 },
                    styles.buttonCart,
                ]}
            >
                <Text style={styles.textAddToCart}>Añadir al carrito</Text>
            </Pressable>

        </ScrollView >
    )
}

export default Cloth;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
    },
    price: {
        marginTop: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: "red"
    },
    subtractAndAdd: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 20,
    },
    description: {
        fontSize: 15,
        padding: 15,
        marginBottom: 20,
    },
    buttonCart: {
        backgroundColor: colors.black,
        borderRadius: 12,
        paddingBlock: 10,
        marginVertical: 10
    },
    textAddToCart: {
        color: colors.white,
        textAlign: "center",
        fontSize: 24,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
})