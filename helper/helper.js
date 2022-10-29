import { monthsName } from "../constants/months";

export const getTodayWithMonthName = (givenDate = null) => {
  const date = getJSDate(givenDate);
  const year = getYear(date);
  const month = getMonthName(date);
  const day = getDay(date);

  return `${day} ${month} ${year}`;
};

export const getDateModules = (givenDate = null) => {
  const date = getJSDate(givenDate);
  const year = getYear(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const week = Math.ceil(day / 7);
  return {
    year,
    month,
    day,
    week,
  };
};

export const getDateWithYYYYMMDD = (givenDate = null) => {
  const date = getJSDate(givenDate);
  const year = getYear(date);
  const month = getMonthNumber(date);
  const day = getDay(date);
  return `${year}-${month}-${day}`;
};

export const restrictDecimalPlace = (amount) => {
  return Math.round(makeNumberPositive(amount) * 100) / 100;
};

const makeNumberPositive = (amount) => {
  return Math.abs(amount);
};
const makeNumberNegative = (amount) => {
  return Math.abs(amount);
};

export const getJSDate = (date) => {
  return date ? new Date(date) : new Date();
};

export const getYear = (date) => {
  return date.getFullYear();
};
const getMonth = (date) => {
  return date.getMonth();
};
const getMonthName = (date) => {
  return monthsName[getMonth(date)];
};
const getDay = (date) => {
  return date.getDate().toString().padStart(2, 0);
};

const getMonthNumber = (date) => {
  return (getMonth(date) + 1).toString().padStart(2, 0);
};

export const remainingChars = (str, number = 50) => {
  return str ? 50 - str.length : 50;
};

export const getTotal = (arr, key) => {
  const total = arr.reduce((sum, item) => sum + item[key], 0);
  return Math.round(total * 100) / 100;
};

export const getTotalWithYear = (arr, key) => {
  let total = 0;
  let year = [];
  console.log(arr);
  arr.forEach((item) => {
    if (!year.includes(item.year)) {
      year.push(item.year);
    }
    total += item[key];
  });
  return {
    total,
    year,
  };
};

export const findIndex = (arr, key, value) => {
  let index = arr.findIndex((el) => el[key] == value);
  return index;
};

export const getSummaryMonthlyWise = (data, year) => {
  let array = [];
  console.log("inside");
  data.forEach((transaction) => {
    if (transaction.year == year) {
      const index = makeNumberPositive(transaction.month) - 1;
      const month = monthsName[index];
      if (!array[month]) {
        array[month] = 0;
      }
      array[month] += transaction.amount;
    }
  });
  return getSummaryAllMonths(array);
};
const getSummaryAllMonths = (data) => {
  let array = [];
  let total = 0;
  monthsName.forEach((month) => {
    let monthTotal = data[month] ? data[month] : 0;
    total += monthTotal;
    array.push(total);
  });
  return array;
};

export const generateDropdownFormat = (arr) => {
  let array = [];
  arr.forEach((item) => {
    let element = {
      label: convertToString(item),
      value: item,
    };
    array.push(element);
  });
  return array;
};

const convertToString = (val) => {
  return val.toString();
};

export const toLower = (str) => {
  return str.toLowerCase();
};
export const upperCase = (str) => {
  return str ? str.toUpperCase() : null;
};

export const getFirstCharUpper = (string) => {
  return string[0].toUpperCase();
};
export const getFirstLetterUpperWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const updateDebtDataArray = (array, index, formData) => {
  let newAmount = formData.amount;
  const debtArray = array[index].debts;
  let subIndex = debtArray.findIndex((el) => el.uuid == formData.uuid);
  if (debtArray[subIndex]) {
    let oldAmount = debtArray[subIndex].amount;
    newAmount = formData.amount - oldAmount;
    debtArray[subIndex] = formData;
  } else {
    debtArray.unshift(formData);
  }
  if (formData.type == "lend") {
    array[index].lendTotal += newAmount;
  } else {
    array[index].borrowTotal += newAmount;
  }
  return array;
};
//debt data, user index , formData
export const deleteDebtDataArray = (array, index, formData) => {
  let newAmount = formData.amount;
  const debtArray = array[index].debts;
  let subIndex = debtArray.findIndex((el) => el.uuid == formData.uuid);

  debtArray.splice(subIndex, 1);

  if (formData.type == "lend") {
    array[index].lendTotal -= newAmount;
  } else {
    array[index].borrowTotal -= newAmount;
  }
  return array;
};

export const getDateGroup = (givenDate = null) => {
  const date = givenDate ? new Date(givenDate) : new Date();
  const firstDOfWeek = new Date(date);
  const lastDOfWeek = new Date(date);
  const year = getYear(date);
  const month = getMonth(date);
  const monthString = getMonthNumber(date);
  const day = date.getDate();
  const dayString = getDay(date);
  const dayWeek = date.getDay() == 0 ? 7 : date.getDay();
  const LastDayOfMonth = new Date(year, month + 1, 0).getDate();
  firstDOfWeek.setDate(firstDOfWeek.getDate() - (dayWeek - 1));
  const firstDayOfWeek = firstDOfWeek.getDate().toString().padStart(2, "0");
  const monthOfFDayWeek = (firstDOfWeek.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const yearOfFDayWeek = firstDOfWeek.getFullYear();
  lastDOfWeek.setDate(lastDOfWeek.getDate() + (7 - dayWeek));
  const lastDayOfWeek = lastDOfWeek.getDate().toString().padStart(2, "0");
  const monthOfLDayWeek = (lastDOfWeek.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const yearOfLDayWeek = lastDOfWeek.getFullYear();
  const weekNumber = Math.ceil(day / 7);
  return {
    today: {
      title: "Today",
      date: `${year}-${monthString}-${dayString}`,
    },
    thisWeek: {
      title: "This Week",
      date: `${monthOfFDayWeek}-${firstDayOfWeek
        .toString()
        .padStart(2, 0)} - ${monthOfLDayWeek}-${lastDayOfWeek
        .toString()
        .padStart(2, 0)}`,
      month: month + 1,
      fDay: firstDayOfWeek,
      fWdate: `${yearOfFDayWeek}-${monthOfFDayWeek}-${firstDayOfWeek}`,
      lDay: lastDayOfWeek,
      lWdate: `${yearOfLDayWeek}-${monthOfLDayWeek}-${lastDayOfWeek}`,
      year: year,
      week: weekNumber,
    },
    thisMonth: {
      title: "This Month",
      date: `${monthString}-01 - ${monthString}-${LastDayOfMonth}`,
      fDay: 1,
      fMdate: `${year}-${monthString}-01`,
      lDay: LastDayOfMonth,
      lMdate: `${year}-${monthString}-${LastDayOfMonth}`,
      year: year,
      month: month + 1,
    },
    thisYear: {
      title: "This Year",
      date: `01-01 - ${monthString}-${dayString}`,
      fYdate: `${year}-01-01`,
      lYdate: `${year}-12-31`,
    },
    weekNumber,
    monthNumber: month + 1,
    dayNumber: day,
    yearNumber: year,
  };
};

export const splitStr = (str, seperator) => {
  return str.split(seperator);
};

export const getRandom = (max) => {
  let min = 0;
  let value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

export const objKeysLength = (obj) => {
  return Object.keys(obj).length;
};
