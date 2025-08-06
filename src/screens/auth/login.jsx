import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Switch, TouchableOpacity } from "react-native";
import { useLoginMutation } from "../../services/shop/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { colors } from "../../global/colors";
import { saveSession, clearSession } from "../../db";
import { FontAwesome } from '@expo/vector-icons';

function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [triggerLogin, result] = useLoginMutation();
    const [persistSession, setPersistSession] = useState(false);
    const [formError, setFormError] = useState();

    const dispatch = useDispatch();

    function logError(mensaje, error) {
        console.error(mensaje, error);
    }

    const validateEmail = (value) => {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.test(value)) {
            setEmailError('Formato de email inválido');
        } else {
            setEmailError("");
        }
    }

    const validatePassword = (value) => {
        if (value.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caractceres");
        } else {
            setPasswordError("");
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async () => {
        validateEmail(email);
        validatePassword(password);

        if (emailError || passwordError || !email || !password) {
            setFormError("Revisá los campos antes de continuar");
            return;
        }

        const response = await triggerLogin({ email, password });
        if (response.error) {
            setFormError("Credenciales incorrectas. Intentá de nuevo.");
        } else {
            const { localId, email: userEmail } = response.data;

            const userName = displayName || userEmail?.split("@")[0];

            if (persistSession) {
                await saveSession(localId, userEmail);
            } else {
                await clearSession();
            }
            dispatch(setUser({ localId, email: userEmail }));

            setTimeout(() => {

            }, 5000);
            setFormError("");
        }
    };

    useEffect(() => {
        const saveLoginSession = async () => {
            if (result.status === "fulfilled") {
                try {
                    const { localId, email } = result.data;

                    if (persistSession) {
                        await saveSession(localId, email);
                    } else {
                        await clearSession();
                    }
                    dispatch(setUser({ localId, email }));
                } catch (error) {
                    logError('Error al guardar sesión', error);
                }
            } else if (result.status === "rejected") {
                logError('Error al iniciar sesión', error);
            }
        };

        saveLoginSession();
    }, [result]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                    setEmail(text)
                    validateEmail(text)
                }}
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Contraseña"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        validatePassword(text);
                    }}
                />
                <Pressable
                    style={styles.iconContainer}
                    onPress={toggleShowPassword}
                >
                    <FontAwesome
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="#000"
                    />
                </Pressable>
            </View>


            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            {formError ? <Text style={styles.error}>{formError}</Text> : null}

            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>¿No tenés cuenta? Crea una</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>

            <View style={styles.sessionPersist}>
                <Text style={{ color: colors.black }}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    trackColor={{ false: colors.lightGray, true: '#4a90e2' }}
                    ios_backgroundColor={colors.lightGray}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 15
    },
    button: {
        backgroundColor: "#4a90e2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    link: {
        color: "#4a90e2",
        textAlign: "center",
        marginBottom: 10,
    },
    sessionPersist: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    error: {
        color: "red",
        marginBottom: 10,
        marginLeft: 5,
        fontSize: 13
    },
    contraseña: {
        marginBottom: 50,
        fontSize: 12,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    inputPassword: {
        flex: 1,
        height: 48,
        fontSize: 16,
    },
    iconContainer: {
        padding: 5,
    },

});

export default Login;