import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { cartNavigator, ordersNavigator, shopNavigator, profileNavigator } from '../screens';
import { colors } from '../global/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Shop"
                component={shopNavigator}
                options={{ tabBarIcon: ({ focused }) => <MaterialCommunityIcons name='bag-personal' size={32} color={focused ? colors.black : colors.lightGray} /> }}
            />
            <Tab.Screen
                name="Cart"
                component={cartNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <FontAwesome name="shopping-cart" size={32} color={focused ? colors.black : colors.lightGray} />
                }}
            />
            <Tab.Screen
                name="Orders"
                component={ordersNavigator}
                options={{ tabBarIcon: ({ focused }) => <FontAwesome name='shopping-bag' size={32} color={focused ? colors.black : colors.lightGray} /> }}
            />
            <Tab.Screen
                name='Profile'
                component={profileNavigator}
                options={{ tabBarIcon: ({ focused }) => <FontAwesome name='user' size={32} color={focused ? colors.black : colors.lightGray} /> }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;