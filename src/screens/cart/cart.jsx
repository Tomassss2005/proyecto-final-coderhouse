import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { removeItems, deleteCart } from "../../features/cart/cartSlice";
import { colors } from '../../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const cart = ({ navigation }) => {

    const cartItems = useSelector(state => state.cartReducer.cartItems)
    const total = useSelector(state => state.cartReducer.total)
    const dispatch = useDispatch();

    const { width } = useWindowDimensions()


    const FooterCart = () => (
        <View style={styles.containerConfirm}>
            <Text style={styles.totalItem}>TOTAL: $ {total}</Text>

            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.85 : 1 },
                    styles.confirmCartButton
                ]}
                onPress={() => {
                    navigation.navigate("Orders")
                }}
            >
                <Text style={styles.buttonConfirmText}>Confirmar compra</Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.85 : 1 },
                    styles.clearCartButton
                ]}
                onPress={() => {
                    Alert.alert(
                        'Vaciar carrito',
                        '¿Querés vaciar el carrito?',
                        [
                            {
                                text: 'No',
                                style: 'cancel'
                            },
                            {
                                text: 'Sí',
                                onPress: () => dispatch(deleteCart())
                            }
                        ],
                        { cancelable: false }
                    );
                }}
            >
                <Text style={styles.clearCartText}>Vaciar carrito</Text>
            </Pressable>

        </View>
    )


    const renderItems = ({ item }) => (

        <View style={{ backgroundColor: colors.white, padding: 20 }}>
            <View>
                <Image
                    source={{ uri: item.image }}
                    alt={item.title}
                    width='100%'
                    height={width * .6}
                    resizeMode="contain"
                    style={{ marginTop: 40, marginBottom: 40 }}
                />
            </View>
            <View>
                <Text style={styles.totalItem}>Producto: {item.title}</Text>
                <Text style={styles.totalItem}>Precio: ${item.price}</Text>
                <Text style={styles.totalItem}>Cantidad: {item.quantity}</Text>
                <Pressable onPress={() => dispatch(removeItems(item.id))}>
                    <Icon style={styles.trashIcon} name='delete' size={24} color="#FC7A5E" />
                </Pressable>
            </View>
        </View>
    )


    return (
        <>
            {
                cartItems.length > 0
                    ?
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.id}
                        renderItem={renderItems}
                        ListHeaderComponent={
                            <Text
                                style={{ textAlign: "start", marginTop: 20, marginBottom: 30, marginLeft: 20, fontSize: 25, fontFamily: "Karla-Bold", color: colors.gris }}>
                                Carrito de compras
                            </Text>}
                        ListFooterComponent={<FooterCart />}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={styles.noneCart}>No tenés ningún producto en el carrito</Text>
                    </View>
            }
        </>
    )
}

export default cart;


const styles = StyleSheet.create({
    containerConfirm: {
        padding: 35,
    },
    confirmCartButton: {
        padding: 10,
        borderRadius: 7,
        marginTop: 12,
        backgroundColor: colors.black
    },
    buttonConfirmText: {
        color: colors.white,
        textAlign: "center",
        fontSize: 18,
    },
    clearCartButton: {
        backgroundColor: '#f44',
        padding: 10,
        borderRadius: 7,
        marginTop: 12,
    },
    clearCartText: {
        color: colors.white,
        textAlign: "center",
        fontSize: 18,
    },
    totalItem: {
        textAlign: "center",
        marginBottom: 8,
        fontSize: 16,
        color: colors.gris,
        fontFamily: "Karla-Bold"
    },
    noneCart: {
        textAlign: "center",
        fontSize: 18,
        color: "black",
        fontFamily: "Karla"
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
})