import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { Chance } from 'chance';
const chance = new Chance();
interface StateType {
  products: any[];
  productSearch: string;
  sortBy: Number;
  cart: any[];
  total: number;
  filters: {
    category: string;
    color: string;
    gender: string;
    price: string;
    rating: string;
  };
  error: string;
}

const initialState = {
  products: [
    
    {
      name: 'Psalms Book for Growth',
      rentalPrice: 89,
      category: 'fan',
      photo: '/public/images/blog/blog-img2.jpg',
      id: 2,
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      name: 'Psalms Book for Growth1',
      rentalPrice: 89,
      category: 'fan',
      photo: '/public/images/blog/blog-img1.jpg',
      id: 2,
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      name: 'Psalms Book for Growth',
      rentalPrice: 89,
      category: 'fan',
      photo: '/public/images/blog/blog-img3.jpg',
      id: 2,
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      name: 'Psalms Book for Growth',
      rentalPrice: 89,
      category: 'fan',
      photo: '/public/images/blog/blog-img4.jpg',
      id: 2,
      description: chance.paragraph({ sentences: 2 }),
    },

  ],
  productSearch: '',
  sortBy: 5,
  cart: [],
  total: 0,
  filters: {
    category: 'All',
    availableStatus: 'Available',
    startDate: '',
    price: '',
  },
  error: '',
};

export const ProductSlice = createSlice({
  name: 'ProductSlice',
  initialState,
  reducers: {
    // HAS ERROR

    hasError(state: StateType, action) {
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    SearchProduct: (state, action) => {
      state.productSearch = action.payload;
    },
    //  SORT  PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },
    //  FILTER PRODUCTS
    filterProducts(state, action) {
      state.filters.category = action.payload.category;
    },

    //  FILTER Reset
    filterReset(state) {
      state.filters.category = 'All';
      state.sortBy = 5;
      state.filters.availableStatus = 'Available';
      state.filters.startDate = '';
      state.filters.price = '';
    },
    sortByPrice(state, action) {
      state.filters.price = action.payload;
    },
  },
});
export const {
  hasError,
  getProducts,
  SearchProduct,
  sortByProducts,
  filterProducts,
  sortByPrice,
  filterReset,
} = ProductSlice.actions;

export default ProductSlice.reducer;
