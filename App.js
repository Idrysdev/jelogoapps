import { AuthProvider } from "./context/AuthContext";
import Navigation from "./navigation/Navigation";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/index.js';
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { store, persistor } = configureStore()

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AuthProvider>
                        <Navigation />
                    </AuthProvider>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
}

// eas build --platform android --profile androidapk