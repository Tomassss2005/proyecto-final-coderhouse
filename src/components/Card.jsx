import { View, StyleSheet } from "react-native";
import { colors } from "../global/colors";

const Card = ({ children }) => {
    return (
        <View style={{ ...styles.container, ...styles.hr }}>
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        paddingVertical: 24,
    },
    hr: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 0,
    },
});
