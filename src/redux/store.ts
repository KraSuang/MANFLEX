import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import airframeReducer from './slice/airframeSlice';
import flightReducer from './slice/flightSlice';
import airportReducer from './slice/airportSlice';
import checklistReducer from './slice/checklistSlice';
import performanceReducer from './slice/performanceSlice';
import resetReducer from './slice/resetAllSlice.ts';

const rootReducer = combineReducers({
    airframe: airframeReducer,
    flight: flightReducer,
    airport: airportReducer,
    checklist: checklistReducer,
    performance: performanceReducer,
    reset: resetReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['reset'], // Prevent reset slice from being persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
