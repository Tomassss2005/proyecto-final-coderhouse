import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({ title }) => {

    const navigation = useNavigation();
    const canGoBack = navigation.canGoBack();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {
                canGoBack &&
                <Pressable style={styles.goBack}
                    onPress={() => navigation.goBack()}>
                    <Icon name='chevron-left' size={32} color={colors.white} />
                </Pressable>
            }
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.black,
    },
    title: {
        fontSize: 24,
        color: colors.white,
        fontFamily: "Karla-Bold"
    },
    subtitle: {
        fontSize: 14,
    },
    goBack: {
        position: "absolute",
        bottom: 10,
        left: 10,
    }
})