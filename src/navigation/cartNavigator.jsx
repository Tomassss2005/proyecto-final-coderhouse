import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { cart } from "../screens";
import Header from "../components/Header";

const Stack = createNativeStackNavigator();

function CartNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Cart'
            screenOptions={{
                tabBarStyle: { position: 'absolute' },
                header: ({ route }) => <Header title="Rude Laburne" subtitle={route.name} />
            }}
        >
            <Stack.Screen name='Cart' component={cart} />
        </Stack.Navigator>
    )
}

export default CartNavigator;