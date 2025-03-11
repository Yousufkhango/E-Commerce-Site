import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import sellerAuthSlice from './sellerAuthSlice';
import draftSlice from '../draft/draftSlice';
import {cartReducer} from '../components/cart/cartSlice'


    const saveToLocalStorage = (state) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('store', serializedState);
        } catch (e) {
            console.warn("Could not save state", e);
        }
    };

    const loadFromLocalStorage = () => {
        try {
            const serializedState = localStorage.getItem('store');
            if (serializedState === null) return undefined;
            return JSON.parse(serializedState);
        } catch (e) {
            console.warn("Could not load state", e);
            return undefined;
        }
    };

    const persistedState = loadFromLocalStorage();

    const store = configureStore({
        preloadedState: persistedState,
        reducer: {
            auth: authSlice,
            sellerAuth: sellerAuthSlice,
            draft: draftSlice,
            cart: cartReducer,
            //TODO: add more slices here for posts
        }
    });

    store.subscribe(() => {
        saveToLocalStorage(store.getState());
    });




export default store;