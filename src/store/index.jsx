// src/store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import propertyReducer from "./propertyReducers";
const rootReducer = combineReducers({
  property: propertyReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
