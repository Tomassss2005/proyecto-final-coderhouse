const RTDB_BASE_URL = process.env.EXPO_PUBLIC_BASE_RTDB_URL;

export const saveUserToDatabase = async (name, email, localId) => {
    try {
        const userData = {
            name,
            email,
            createdAt: new Date().toISOString(),
        };

        const response = await fetch(`${RTDB_BASE_URL}/users/${localId}.json`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Error al guardar el usuario en la base de datos.");
        }

        return true;
    } catch (error) {
        throw new Error("saveUserToDatabase Error:, error.message");
        return false;
    }
};