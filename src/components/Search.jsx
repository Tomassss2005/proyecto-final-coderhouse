import { TextInput, View, StyleSheet } from "react-native";
import { colors } from "../global/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const Search = ({ keyword, setKeyword }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                onChangeText={(text) => setKeyword(text)}
                style={styles.textInput}
                value={keyword}
            />
            <Ionicons name="search" size={30} color={colors.black} />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        margin: 8,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 8,
        paddingVertical: 12,
        width: "90%",
    },
});
