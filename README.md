# Rude Laburne

Aplicación móvil desarrollada con **React Native** que permite a los usuarios **registrarse, iniciar sesión y comprar prendas de ropa** usando **Firebase Authentication** y **Firebase Realtime Database**. La app también maneja estado global con **Redux Toolkit**.

---

## Funcionalidades Principales

- Registro de usuario con Firebase Authentication
- Inicio de sesión
- Almacenamiento de datos en Realtime Database
- Manejo global del estado con Redux Toolkit
- Redirección luego del login o registro
- Gestión de perfil del usuario (imagen y datos)
- Catálogo de prendas disponibles

---

## Tecnologías utilizadas

- React Native
- Expo
- Firebase (Auth + Realtime DB)
- Redux Toolkit
- React Navigation

---

## Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/)
- npm (viene con Node.js)
- Expo CLI (si usás Expo):
  ```bash
  npm install -g expo-cli


# Instalación

1. Cloná el repositorio:
git clone https://github.com/Tomassss2005/proyecto-final-coderhouse.git
cd proyecto-final-coderhouse


2. Instalá las dependencias:
npm install


3. Configurá tus variable de entorno en Firebase:
Creá un archivo .env en la raíz del proyecto con las siguientes variables:

EXPO_PUBLIC_BASE_RTDB_URL=TU_BASE_RTDB_URL
EXPO_PUBLIC_AUTH_URL=TU_AUTH_URL
EXPO_PUBLIC_API_KEY=TU_API_KEY
EXPO_PUBLIC_MAPS_API_KEY=TU_MAPS_API_KEY

4. Ejecución del Proyecto
Para correr la app: npx expo start