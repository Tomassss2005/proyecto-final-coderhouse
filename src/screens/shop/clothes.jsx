import { FlatList, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetClothesByCategoryQuery } from '../../services/shop/shopApi';
import Card from '../../components/Card';
import Search from '../../components/Search';
import { colors } from '../../global/colors';

const Clothes = ({ navigation }) => {
    const [clothesFiltered, setClothesFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    const clothes = useSelector(state => state.shopReducer.clothes)
    const category = useSelector(state => state.shopReducer.categorySelected)

    const { data: clothesFilteredByCategory, isLoading, error } = useGetClothesByCategoryQuery(category.toLowerCase())

    useEffect(() => {
        if (keyword) {
            const clothesFilteredByKeyword = clothesFilteredByCategory.filter(
                cloth => cloth.title.toLowerCase().includes(keyword.toLowerCase())
            )
            setClothesFiltered(clothesFilteredByKeyword)
        } else {
            setClothesFiltered(clothesFilteredByCategory)
        }
    }, [category, keyword, clothesFilteredByCategory])

    const renderClothItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate("Cloth", { cloth: item })}>
            <Card>
                <Text>{item.title}</Text>
            </Card>
        </Pressable>
    );

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

    return (
        <>
            <Search keyword={keyword} setKeyword={setKeyword} />
            {
                clothesFiltered?.length > 0 ? (
                    <FlatList
                        data={clothesFiltered}
                        renderItem={renderClothItem}
                        keyExtractor={item => item.id.toString()}
                    />
                ) : (
                    <View style={styles.centered}>
                        <Text>No se encontraron productos para esta categoría.</Text>
                    </View>
                )
            }
        </>
    );
};

export default Clothes;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
});