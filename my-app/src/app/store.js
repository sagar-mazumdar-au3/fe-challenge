import {
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../saga";

const todoSlice = createSlice({
  name: "repo",
  initialState: {
    oneMonth: {
      repos: [],
      currentPage: 1,
      isAllDataFetched: false,
    },
    twoWeeks: {
      repos: [],
      currentPage: 1,
      isAllDataFetched: false,
    },
    oneWeek: {
      repos: [],
      currentPage: 1,
      isAllDataFetched: false,
    },
    selectedWeek: 3, // 1 for 1 week & 2 for 2 weeks and 3 for 30 days
  },
  reducers: {
    fetchData: (state, action) => {
      debugger;
      if (state.selectedWeek === 3) {
        console.log("oneMonth", state.oneMonth.repos)
        state.oneMonth.repos = [...state.oneMonth.repos, ...action.payload];
      } else if (state.selectedWeek === 2) {
        console.log("oneMonth", state.twoWeeks.repos)

        state.twoWeeks.repos = [...state.twoWeeks.repos, ...action.payload];
      } else {
        console.log("oneMonth", state.oneWeek.repos)

        state.oneWeek.repos = [...state.oneWeek.repos, ...action.payload];
      }
    },
    nextPage: (state) => {
      if (state.selectedWeek === 3) {
        state.oneMonth.currentPage = state.oneMonth.currentPage + 1;
      } else if (state.selectedWeek === 2) {
        state.twoWeeks.currentPage = state.twoWeeks.currentPage + 1;
      } else {
        state.oneWeek.currentPage = state.oneWeek.currentPage + 1;
      }
    },
    isAllDataFetched: (state) => {
      if (state.selectedWeek === 3) {
        state.oneMonth.isAllDataFetched = true;
      } else if (state.selectedWeek === 2) {
        state.twoWeeks.isAllDataFetched = true;
      } else {
        state.oneWeek.isAllDataFetched = true;
      }
    },
    expandItemByid: (state, action) => {
      if (state.selectedWeek === 3) {
        state.oneMonth.repos.forEach((item) => {
          if (item.id === action.payload)
            item.expand = !item.expand;
        })
      } else if (state.selectedWeek === 2) {
        state.oneMonth.repos.forEach((item) => {
          if (item.id === action.payload)
            item.expand = !item.expand;
        })
      } else {
        state.oneMonth.repos.forEach((item) => {
          if (item.id === action.payload)
            item.expand = !item.expand;
        })
      }
    },
    changeWeek: (state, action) => {
      state.selectedWeek = action.payload;
    },

  }
});

export const { fetchData, nextPage, isAllDataFetched, expandItemByid, changeWeek } = todoSlice.actions;

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repo: todoSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(saga);

export default store;
