import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDataToExpenseData,
  getCategoryNameArray,
  getExpenseSummary,
  removeItemFromExpenseArray,
  updateExpenseSummaryData,
  updateItemInExpenseArray,
} from "../../helper/expense";
import { getDateGroup } from "../../helper/helper";

const initialState = {
  loaded: false,
  dateGroup: getDateGroup(),
  expenseYearArray: [],
  summary: {
    today: {
      income: 0,
      expense: 0,
      balance: 0,
      chart: {},
    },
    week: {
      income: 0,
      expense: 0,
      balance: 0,
      chart: {},
    },
    month: {
      income: 0,
      expense: 0,
      balance: 0,
      chart: {},
    },
    year: {
      income: 0,
      expense: 0,
      balance: 0,
      chart: {},
    },
    balance: 0,
  },
  payment: {
    type: "expense",
    categoryNames: [],
    add: { selectedCategory: "", amount: "" },
    transData: [],
    data: {
      expense: [],
      category: [],
    },
  },
  selectedCategory: null,
  selectedExpenseItem: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateExpenseItem(state, action) {
      state.selectedExpenseItem = action.payload.data;
    },
    updateCategory(state, action) {
      const categoryId = action.payload.catId;
      const itemId = action.payload.itemId;
      let category = state.payment.data.category[categoryId];

      let selectedCategory = category.category;
      let selectedCategoryItem = category.items[itemId];
      state.selectedCategory = `${selectedCategory}:${selectedCategoryItem}`;
    },
    sendingHttpRequest(state) {
      state.loaded = false;
    },
    getHttpRequest(state) {
      state.loaded = true;
    },
    initialExpenseData(state, action) {
      state.payment.data.expense = action.payload.expense;
      state.payment.data.category = action.payload.category;
      state.recurringData = action.payload.recurring;
      state.appToken = action.payload.token;
      state.payment.categoryNames = getCategoryNameArray(
        action.payload.category
      );
    },
    calculateSummary(state) {
      const copySummary = { ...state.summary };
      const copyYearArray = state.expenseYearArray.slice();
      const getNewExpenseSummary = getExpenseSummary(
        copySummary,
        state.dateGroup,
        state.payment.data.expense,
        copyYearArray
      );
      state.expenseYearArray = [...getNewExpenseSummary.yearArray];
      state.summary = {
        ...state.summary,
        ...getNewExpenseSummary.expenseSummary,
      };
    },
    savePayment(state, action) {
      const copySummary = { ...state.summary };
      const copyYearArray = state.expenseYearArray.slice();
      const getNewExpenseSummary = getExpenseSummary(
        copySummary,
        state.dateGroup,
        action.payload.data,
        copyYearArray
      );
      state.expenseYearArray = [...getNewExpenseSummary.yearArray];
      // console.log(state.expenseYearArray);
      state.summary = {
        ...state.summary,
        ...getNewExpenseSummary.expenseSummary,
      };

      const copyArray = state.payment.data.expense.slice();
      const newArray = addNewDataToExpenseData(copyArray, action.payload.data);
      // const newArray = action.payload.data.concat(copyArray);
      state.payment = {
        ...state.payment,
        type: "expense",
        add: { selectedCategory: "", amount: "" },
        transData: [],
        data: {
          ...state.payment.data,
          expense: newArray,
        },
      };
    },
    addNewCategory(state, action) {
      const copyArray = state.payment.data.category.slice();
      const findIndex = copyArray.findIndex(
        (el, i) =>
          el.category.trim().toLowerCase() ==
          action.payload.category.category.trim().toLowerCase()
      );

      if (copyArray[findIndex]) {
        copyArray[findIndex].items = action.payload.category.items;
      } else {
        copyArray.unshift(action.payload.category);
        const nameArray = state.payment.categoryNames.slice();
        nameArray.unshift({
          value: action.payload.category.category,
          label: action.payload.category.category,
        });
        state.payment.categoryNames = nameArray;
      }

      state.payment.data = {
        ...state.payment.data,
        category: [...copyArray],
      };
    },
    removeExpenseSummaryAndData(state, action) {
      const copySummary = { ...state.summary };
      const copyExpenseData = state.payment.data.expense.slice();

      const latestExpenseData = removeItemFromExpenseArray(
        copyExpenseData,
        action.payload.data
      );
      state.payment.data.expense = latestExpenseData;
      const newSummary = updateExpenseSummaryData(
        copySummary,
        state.dateGroup,
        action.payload.data,
        action.payload.updatedAmount
      );
      state.summary = newSummary;
    },
    updateExpenseSummaryAndData(state, action) {
      const copySummary = { ...state.summary };
      const copyExpenseData = state.payment.data.expense.slice();

      const latestExpenseData = updateItemInExpenseArray(
        copyExpenseData,
        action.payload.data
      );

      state.payment.data.expense = latestExpenseData;
      const newSummary = updateExpenseSummaryData(
        copySummary,
        state.dateGroup,
        action.payload.data
      );
      state.summary = newSummary;
    },
  },
});
export default expenseSlice;
