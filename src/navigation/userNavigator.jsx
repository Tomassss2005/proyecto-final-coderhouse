import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { profile } from "../screens";
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

function UserNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                tabBarStyle: { position: 'absolute' },
                header: ({ route }) => <Header title="Rude Laburne" subtitle={route.name} />
            }}
        >
            <Stack.Screen name='Profile' component={profile} />
        </Stack.Navigator>
    )
}

export default UserNavigator;