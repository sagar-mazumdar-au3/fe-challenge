import {
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../saga";

const todoSlice = createSlice({
  name: "repo",
  initialState: {
    repos: [],
    currentPage: 1,
    isAllDataFetched: false,
  },
  reducers: {
    fetchData: (state, action) => {
      state.repos = [...state.repos, ...action.payload];
    },
    nextPage: (state) => {
      state.currentPage = ++state.currentPage;
    },
    isAllDataFetched: (state) => {
      state.isAllDataFetched = true;
    },
    expandItemByid: (state, action) => {
      console.log("action", action.payload);
      console.log("state.repos", state.repos);

      state.repos.forEach((item)=>{
        if(item.id === action.payload)
        item.expand = !item.expand;
      })
      console.log("state.repos", state.repos);

      
    },

  }
});

export const { fetchData, nextPage, isAllDataFetched, expandItemByid } = todoSlice.actions;

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repo: todoSlice.reducer
  },
  middleware : (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(saga);

export default store;
