import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import { useRegisterMutation } from "../../services/shop/auth/authApi";
import { saveUserToDatabase } from "../../services/shop/auth/registerUserApi.js";

function Register({ navigation }) {

    const [triggerRegister] = useRegisterMutation();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [formError, setFormError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    const validateName = (value) => {
        if (value.trim().length < 3) {
            setNameError("Ingresá tu nombre completo");
        } else {
            setNameError("");
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("Formato de email inválido");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres");
        } else {
            setPasswordError("");
        }
    };

    const handleRegister = async () => {
        validateName(name);
        validateEmail(email);
        validatePassword(password);

        if (!email || !password || emailError || passwordError) {
            setFormError("Revisá los campos antes de continuar");
            return;
        }

        try {
            const response = await triggerRegister({
                email,
                password,
                returnSecureToken: true,
            });

            const localId = response?.data?.localId;
            if (!localId) {
                setFormError("No se pudo crear el usuario.");
                return;
            }

            const success = await saveUserToDatabase(name, email, localId);

            if (!success) {
                setFormError("No se pudo guardar el usuario. Intentá más tarde.");
                return;
            }

            setFormError("");
            setSuccessMessage("¡Cuenta creada con éxito!")
            setTimeout(() => {
                navigation.navigate("Login");
            }, 2000);
        } catch (err) {
            setFormError("Error inesperado. Intentá más tarde.");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {successMessage ? (
                        <Text style={{ color: "green", fontWeight: "bold", fontSize: "20", textAlign: "center", marginBottom: 100 }}>
                            {successMessage}
                        </Text>
                    ) : null}
                    <Text style={styles.title}>Crear cuenta</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        value={name}
                        onChangeText={(value) => {
                            setName(value);
                            validateName(value);
                        }}
                    />

                    {nameError && <Text style={styles.error}>{nameError}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            validateEmail(value);
                        }}
                    />

                    {emailError && <Text style={styles.error}>{emailError}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            validatePassword(value);
                        }}
                    />

                    {passwordError && <Text style={styles.error}>{passwordError}</Text>}

                    {formError !== "" && (
                        <Text style={{ color: "red", marginBottom: 8 }}>{formError}</Text>
                    )}

                    <Pressable style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>{isLoading ? "Creando..." : "Crear cuenta"}</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>¿Ya tenés una cuenta? Inicia sesión</Text>
                    </Pressable>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        backgroundColor: "#4caf50",
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
        textAlign: "center"
    },
    error: {
        color: "red",
        fontSize: 13,
        marginBottom: 10
    },
});

export default Register; 