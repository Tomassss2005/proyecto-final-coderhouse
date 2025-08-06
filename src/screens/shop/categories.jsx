import { StyleSheet, FlatList, View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { filteredClothes, setCategorySelected } from "../../features/shop/shopSlice";
import { useGetCategoriesQuery } from '../../services/shop/shopApi';
import Card from '../../components/Card';
import KarlaBold from '../../components/fonts-component/KarlaBold';
import { colors } from '../../global/colors';


const Categories = ({ navigation }) => {

    const dispatch = useDispatch();

    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.blue} />
                <Text style={{ fontSize: 16, textAlign: "center" }}>Cargando productos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={{ fontSize: 16, textAlign: "center" }}>Ocurrió un error al cargar los productos.</Text>
            </View>
        );
    }

    const renderCategoryItem = ({ item }) => (

        <Pressable onPress={
            () => {
                dispatch(setCategorySelected(item.title))
                dispatch(filteredClothes())
                navigation.navigate("Clothes")
            }}>
            <Card>
                <View style={styles.categoryContainer}>
                    <KarlaBold style={styles.categoryText}>{item.title}</KarlaBold>
                    <Image width={60} height={60} source={{ uri: item.image }} />
                </View>
            </Card>
        </Pressable>
    )

    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id} />
    )
}

export default Categories;

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
    },
    categoryText: {
        fontSize: 18,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
})