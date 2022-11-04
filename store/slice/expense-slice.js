import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDataToExpenseData,
  getCategoryNameArray,
  getExpenseSummary,
  removeItemFromExpenseArray,
  updateExpenseSummaryData,
  updateItemInExpenseArray,
} from "../../helper/expense";
import { getDateGroup, getDateWithYYYYMMDD } from "../../helper/helper";
import { required } from "../../helper/validator";

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
  recurringPayment: {
    name: {
      value: "",
      valid: false,
      validator: true,
      error: "Please enter Payment description to continue the process",
    },
    amount: {
      value: "",
      valid: false,
      validator: true,
      error: "Please enter a valid amount to process your request!!",
    },
    pay_method: {
      value: "weekly",
      valid: true,
      validator: false,
    },
    date: {
      value: getDateWithYYYYMMDD(),
      valid: true,
      validator: false,
    },
    num_of_pay: {
      value: 1,
      valid: true,
      validator: true,
      error: "Please enter Number of Total Payment to continue the process",
    },
    category: {
      value: "",
      valid: false,
      validator: true,
      error: "Select a category to process your request!!",
    },
  },
  checked_payment_number: false,
  recurringDataArray: [],
  recurringPayType: "expense",
  selectedRecurringItem: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setSelectedRecurringItem(state, action) {
      state.selectedRecurringItem = action.payload.data;
    },
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
      state.recurringDataArray = action.payload.recurring;
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
    updateRecurringFormData(state, action) {
      const copyFormData = { ...state.recurringPayment };
      let formValue = action.payload.value;
      let valid = true;
      if (copyFormData[action.payload.type].validator) {
        valid = valid && required(formValue);
      }
      copyFormData[action.payload.type] = {
        ...copyFormData[action.payload.type],
        value: action.payload.value,
        valid,
      };
      state.recurringPayment = { ...copyFormData };
    },
    updateRecurringPayType(state, action) {
      state.recurringPayType = action.payload.type;
      const copyFormData = { ...state.recurringPayment };
      if (action.payload.type == "income") {
        copyFormData.category = {
          ...copyFormData.category,
          value: "Income",
          valid: true,
        };
      } else {
        copyFormData.category = {
          ...copyFormData.category,
          value: "",
          valid: false,
        };
      }
      state.recurringPayment = { ...copyFormData };
    },
    updateRecurringPayCheckBox(state, action) {
      state.checked_payment_number = action.payload.value;
      const copyFormData = { ...state.recurringPayment };
      copyFormData.num_of_pay = {
        ...copyFormData.num_of_pay,
        value: "",
        valid: action.payload.value ? true : false,
      };
      state.recurringPayment = { ...copyFormData };
    },
    updateRecurringData(state, action) {
      const copyArray = state.recurringDataArray.slice();
      copyArray.unshift(action.payload.recurring_payment);
      state.recurringDataArray = copyArray;

      const copyExpense = state.payment.data.expense.slice();
      if (action.payload.expense_data) {
        const copySummary = { ...state.summary };
        const copyYearArray = state.expenseYearArray.slice();
        // console.log(copyYearArray);
        const getNewExpenseSummary = getExpenseSummary(
          copySummary,
          state.dateGroup,
          [action.payload.expense_data],
          copyYearArray
        );
        state.expenseYearArray = [...getNewExpenseSummary.yearArray];
        // console.log(state.expenseYearArray);
        state.summary = {
          ...state.summary,
          ...getNewExpenseSummary.expenseSummary,
        };
        state.changeSummary = false;

        copyExpense.unshift(action.payload.expense_data);
        state.payment.data.expense = copyExpense;
      }
    },
    clearRecurringData(state) {
      state.recurringPayType = "expense";
      state.checked_payment_number = false;
      state.selectedCategory = null;
      state.recurringPayment = {
        name: {
          value: "",
          valid: false,
          validator: true,
          error: "Please enter Payment description to continue the process",
        },
        amount: {
          value: "",
          valid: false,
          validator: true,
          error: "Please enter a valid amount to process your request!!",
        },
        pay_method: {
          value: "weekly",
          valid: true,
          validator: false,
        },
        date: {
          value: getDateWithYYYYMMDD(),
          valid: true,
          validator: false,
        },
        num_of_pay: {
          value: 1,
          valid: true,
          validator: true,
          error: "Please enter Number of Total Payment to continue the process",
        },
        category: {
          value: "",
          valid: false,
          validator: true,
          error: "Select a category to process your request!!",
        },
      };
    },
    setRecurringFormDataForUpdate(state) {
      let data = state.selectedRecurringItem;
      state.recurringPayType = data.type;
      state.checked_payment_number = data.num_of_pay == 0 ? true : false;
      state.selectedCategory = data.category;
      state.recurringPayment = {
        name: {
          value: data.name,
          valid: true,
          validator: true,
          error: "Please enter Payment description to continue the process",
        },
        amount: {
          value: data.amount,
          valid: true,
          validator: true,
          error: "Please enter a valid amount to process your request!!",
        },
        pay_method: {
          value: data.pay_method,
          valid: true,
          validator: false,
        },
        date: {
          value: getDateWithYYYYMMDD(data.next_pay_date),
          valid: true,
          validator: false,
        },
        num_of_pay: {
          value: data.num_of_pay,
          valid: true,
          validator: true,
          error: "Please enter Number of Total Payment to continue the process",
        },
        category: {
          value: data.category,
          valid: true,
          validator: true,
          error: "Select a category to process your request!!",
        },
      };
    },
    updateExistingRecurringData(state, action) {
      const data = action.payload.data;
      const copyArray = state.recurringDataArray.slice();
      const findIndex = copyArray.findIndex((el) => el.uuid == data.uuid);
      copyArray[findIndex] = data;
      state.recurringDataArray = copyArray;
    },
    deleteExistingRecurringData(state, action) {
      const data = action.payload.data;
      const copyArray = state.recurringDataArray.slice();
      const findIndex = copyArray.findIndex((el) => el.uuid == data.uuid);
      copyArray[findIndex] = {
        ...copyArray[findIndex],
        num_of_pay: data.num_of_pay,
        status: data.status,
      };
      state.recurringDataArray = copyArray;
    },
  },
});
export default expenseSlice;
