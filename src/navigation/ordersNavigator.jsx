import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { orders } from "../screens";
import Header from "../components/Header";


const Stack = createNativeStackNavigator();

function OrdersNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Orders'
            screenOptions={{
                header: ({ route }) => <Header title="Rude Laburne" subtitle={route.name} />
            }}
        >
            <Stack.Screen name='Orders' component={orders} />
        </Stack.Navigator>
    )
}

export default OrdersNavigator;