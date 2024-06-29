import axios from '../../../utils/axios';
import { filter, map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

import { sub } from 'date-fns';
import { Chance } from 'chance';
const chance = new Chance();

interface StateType {
  products: any[];
  productSearch: string;
  sortBy: string;
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
      title: 'How Innovation Works',
      price: 275,
      discount: 25,
      related: false,
      salesPrice: 350,
      category: ['books'],
      gender: 'Men',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#1890FF'],
      photo: '/images/products/s1.jpg',
      id: 1,
      created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Psalms Book for Growth',
      price: 89,
      discount: 10,
      related: true,
      salesPrice: 99,
      category: ['books'],
      gender: 'Women',
      rating: 3,
      stock: false,
      qty: 1,
      colors: ['#1890FF', '#94D82D', '#FF4842'],
      photo: '/images/products/s2.jpg',
      id: 2,
      created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'The Psychology of Money',
      price: 125,
      discount: 12,
      related: false,
      salesPrice: 137,
      category: ['fashion', 'books'],
      gender: 'Kids',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#FF4842', '#1890FF', '#94D82D'],
      photo: '/images/products/s3.jpg',
      id: 3,
      created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Boat Headphone',
      price: 50,
      discount: 15,
      related: true,
      salesPrice: 65,
      category: ['electronics'],
      gender: 'Men',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#1890FF', '#94D82D', '#FFC107'],
      photo: '/images/products/s4.jpg',
      id: 4,
      created: sub(new Date(), { days: 4, hours: 9, minutes: 40 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'MacBook Air Pro',
      price: 650,
      discount: 250,
      related: true,
      salesPrice: 900,
      category: ['fashion', 'electronics'],
      gender: 'Women',
      rating: 3,
      stock: false,
      qty: 1,
      colors: ['#00AB55', '#000000'],
      photo: '/images/products/s5.jpg',
      id: 5,
      created: sub(new Date(), { days: 2, hours: 5, minutes: 50 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Gaming Console',
      price: 25,
      discount: 6,
      related: true,
      salesPrice: 31,
      category: ['electronics'],
      gender: 'Men',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#FFC0CB', '#FF4842'],
      photo: '/images/products/s6.jpg',
      id: 6,
      created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Red Valvet Dress',
      price: 150,
      discount: 50,
      related: false,
      salesPrice: 200,
      category: ['fashion'],
      gender: 'Women',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#FF4842', '#1890FF', '#94D82D'],
      photo: '/images/products/s7.jpg',
      id: 7,
      created: sub(new Date(), { days: 6, hours: 10, minutes: 0 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Shoes for Girls',
      price: 300,
      discount: 80,
      related: false,
      salesPrice: 380,
      category: ['fashion', 'toys'],
      gender: 'Women',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#1890FF', '#94D82D', '#FFC107'],
      photo: '/images/products/s8.jpg',
      id: 8,
      created: sub(new Date(), { days: 7, hours: 5, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Short & Sweet Purse',
      price: 175,
      discount: 25,
      related: false,
      salesPrice: 200,
      category: ['fashion'],
      gender: 'Women',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#00AB55', '#000000'],
      photo: '/images/products/s9.jpg',
      id: 9,
      created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Toy Dino for Fun',
      price: 210,
      discount: 40,
      related: false,
      salesPrice: 250,
      category: ['toys'],
      gender: 'Kids',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#FFC0CB', '#FF4842'],
      photo: '/images/products/s10.jpg',
      id: 10,
      created: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Cute Soft Teddybear',
      price: 285,
      discount: 60,
      related: false,
      salesPrice: 345,
      category: ['toys'],
      gender: 'Kids',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#FF4842', '#1890FF', '#94D82D'],
      photo: '/images/products/s11.jpg',
      id: 11,
      created: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
    {
      title: 'Little Angel Toy',
      price: 5,
      discount: 5,
      related: false,
      salesPrice: 10,
      category: ['toys'],
      gender: 'Kids',
      rating: 3,
      stock: true,
      qty: 1,
      colors: ['#1890FF', '#94D82D', '#FFC107'],
      photo: '/images/products/s12.jpg',
      id: 12,
      created: sub(new Date(), { days: 9, hours: 6, minutes: 20 }),
      description: chance.paragraph({ sentences: 2 }),
    },
  ],
  approvedOrders: [],
  pendingOrders: [],
  productSearch: '',
  sortBy: 'newest',
  cart: [],
  total: 0,
  filters: {
    category: 'All',
    color: 'All',
    gender: 'All',
    price: 'All',
    rating: '',
  },
  error: '',
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // HAS ERROR

    hasError(state: StateType, action) {
      state.error = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setApprovedOrders: (state, action) => {
      state.approvedOrders = action.payload;
    },
    setPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    SearchProduct: (state, action) => {
      state.productSearch = action.payload;
    },

    //  SORT  PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    //  SORT  PRODUCTS
    sortByGender(state, action) {
      state.filters.gender = action.payload.gender;
    },

    //  SORT  By Color
    sortByColor(state, action) {
      state.filters.color = action.payload.color;
    },

    //  SORT  By Color
    sortByPrice(state, action) {
      state.filters.price = action.payload.price;
    },

    //  FILTER PRODUCTS
    filterProducts(state, action) {
      state.filters.category = action.payload.category;
    },

    //  FILTER Reset
    filterReset(state) {
      state.filters.category = 'All';
      state.filters.color = 'All';
      state.filters.gender = 'All';
      state.filters.price = 'All';
      state.sortBy = 'newest';
    },

    // ADD TO CART
    addToCart(state: StateType, action) {
      const product = action.payload;
      state.cart = [...state.cart, product];
    },

    // qty increment
    increment(state: StateType, action) {
      const productId = action.payload;
      const updateCart = map(state.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty + 1,
          };
        }

        return product;
      });

      state.cart = updateCart;
    },

    // qty decrement
    decrement(state: StateType, action) {
      const productId = action.payload;
      const updateCart = map(state.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty - 1,
          };
        }

        return product;
      });

      state.cart = updateCart;
    },

    // delete Cart
    deleteCart(state: StateType, action) {
      const updateCart = filter(state.cart, (item) => item.id !== action.payload);
      state.cart = updateCart;
    },
  },
});
export const {
  hasError,
  setPendingOrders,
  setApprovedOrders,
  setProducts,
  SearchProduct,
  sortByProducts,
  filterProducts,
  sortByGender,
  increment,
  deleteCart,
  decrement,
  addToCart,
  sortByPrice,
  filterReset,
  sortByColor,
} = ProductSlice.actions;

export default ProductSlice.reducer;
