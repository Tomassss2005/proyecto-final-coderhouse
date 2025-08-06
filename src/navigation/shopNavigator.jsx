import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { categories, cloth, clothes } from '../screens';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

function ShopNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Categories'
            screenOptions={{
                header: ({ route }) => <Header title="Rude Laburne" subtitle={route.name} />
            }}
        >
            <Stack.Screen name='Categories' component={categories} />
            <Stack.Screen name='Cloth' component={cloth} />
            <Stack.Screen name='Clothes' component={clothes} />
        </Stack.Navigator>
    )
}

export default ShopNavigator;