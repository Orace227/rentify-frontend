import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ProductReducer from './reducers/products/ProductsSlice';
export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    productReducer: ProductReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// const rootReducer = combineReducers({
//   customizer: CustomizerReducer,
//   product: ProductReducer,
// });
