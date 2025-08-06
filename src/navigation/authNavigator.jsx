import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { login, register } from "../screens"

const Stack = createNativeStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                tabBarStyle: { position: 'absolute' },
                headerShown: false,
            }}
        >
            <Stack.Screen name='Login' component={login} />
            <Stack.Screen name='Register' component={register} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;