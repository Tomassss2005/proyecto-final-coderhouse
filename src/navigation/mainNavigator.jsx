import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilePictureQuery } from "../store/user/userApi";
import { setProfilePicture, setUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { initSessionTable, getSession } from "../db";
import { ActivityIndicator, View } from "react-native";
import AuthNavigator from "../navigation/authNavigator";
import TabNavigator from "../navigation/tabNavigator";


function MainNavigator() {

    const user = useSelector(state => state.userReducer.user);
    const localId = useSelector(state => state.userReducer.localId);
    const [checkingSession, setCheckingSession] = useState(true);


    const dispatch = useDispatch();
    const { data: profilePicture, isLaoding, error } = useGetProfilePictureQuery(localId);

    useEffect(() => {
        const bootstrap = async () => {
            await initSessionTable();
            const session = await getSession();
            if (session?.email && session?.localId) {
                dispatch(setUser({ email: session.email, localId: session.localId }));
            }
            setCheckingSession(false);
        };
        bootstrap();
    }, []);


    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {
                user ? <TabNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator;