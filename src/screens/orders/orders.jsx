import { StyleSheet, Text, View } from 'react-native'

function orders() {
    return (
        <View style={styles.container}>
            <Text style={styles.working}> Estamos trabajando en el área de ventas. Pronto estará disponible.</Text>
        </View>
    )
}

export default orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    working: {
        textAlign: "center",
        fontSize: 20,
        color: "black",
        fontFamily: "Karla"
    },
})