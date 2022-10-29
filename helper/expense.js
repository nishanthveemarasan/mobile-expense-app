import { restrictDecimalPlace, toLower } from "./helper";

export const getCategoryNameArray = (array) => {
  const newArray = [];
  array.forEach((element) => {
    newArray.push({ value: element.category, label: element.category });
  });
  return newArray;
};

export const getExpenseSummary = (
  expenseSummary,
  dateGroup,
  data,
  yearArray
) => {
  const thisWeek = dateGroup.weekNumber;
  const thisMonth = dateGroup.monthNumber;
  const thisYear = dateGroup.yearNumber;
  const weekStart = dateGroup.thisWeek.fWdate;
  const weekEnd = dateGroup.thisWeek.lWdate;

  data.forEach((el, i) => {
    if (!yearArray.includes(el.year)) {
      yearArray.push(el.year);
    }
    if (
      new Date(dateGroup.today.date).getTime() == new Date(el.date).getTime()
    ) {
      const today = expenseSummary.today;
      getExepnseSummaryOfType(today, el);
    }
    if (
      new Date(el.date).getTime() >= new Date(weekStart).getTime() &&
      new Date(el.date).getTime() <= new Date(weekEnd).getTime()
    ) {
      const week = expenseSummary.week;
      getExepnseSummaryOfType(week, el);
    }
    if (thisMonth == el.month && thisYear == el.year) {
      const month = expenseSummary.month;
      getExepnseSummaryOfType(month, el);
    }

    if (thisYear == el.year) {
      const year = expenseSummary.year;
      getExepnseSummaryOfType(year, el);
    }

    expenseSummary.balance += el.amount;
  });
  // console.log(expenseSummary);
  return { expenseSummary, yearArray };
};
const getExepnseSummaryOfType = (dateType, el) => {
  dateType.income =
    el.type == "income" ? dateType.income + el.amount : dateType.income;
  dateType.expense =
    el.type == "expense" ? dateType.expense + el.amount : dateType.expense;
  dateType.balance += el.amount;
  dateType.chart[el.category] = dateType.chart[el.category]
    ? dateType.chart[el.category] + Math.abs(el.amount)
    : Math.abs(el.amount);
  return dateType;
};
export const getTtotalExpenseIncome = (dataArray) => {
  let summary = {
    expense: 0,
    income: 0,
    category: [],
  };
  dataArray.forEach((el, i) => {
    if (el.type == "expense") {
      summary.expense += el.amount;
    } else {
      summary.income += el.amount;
    }

    if (!summary.category[el.category]) {
      summary.category[el.category] = {
        data: [],
        total: 0,
      };
    }
    summary.category[el.category].data.push(el);
    summary.category[el.category].total += el.amount;
  });

  return summary;
};
export const getPercentage = (total, key, balance, income) => {
  if (toLower(key) == "income") {
    const persentage = (
      (restrictDecimalPlace(total) / restrictDecimalPlace(income)) *
      100
    ).toFixed(2);
    return `£${restrictDecimalPlace(Math.abs(total))} / ${persentage}%`;
  } else {
    const persentage = (
      (restrictDecimalPlace(total) / restrictDecimalPlace(balance)) *
      100
    ).toFixed(2);
    return `-£${restrictDecimalPlace(Math.abs(total))} / ${persentage}%`;
  }
};
export const filterDataByType = (dataArray, type) => {
  let data = [];
  let total = 0;
  const category = [];
  dataArray.forEach((el, i) => {
    if (el.type == type) {
      data.push(el);
      total += el.amount;

      if (!category[el.category]) {
        category[el.category] = {
          data: [],
          total: 0,
        };
      }
      category[el.category].data.push(el);
      category[el.category].total += el.amount;
    }
  });

  return { data, total: total.toFixed(2), category };
};
export const getWeekDetails = (firstDayOfWeek, lastDayOfWeek) => {
  const dayWeek = firstDayOfWeek.getDay() == 0 ? 7 : firstDayOfWeek.getDay();
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - (dayWeek - 1));
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + (7 - dayWeek));

  return {
    dateStart: `${firstDayOfWeek.getFullYear()}-${(
      firstDayOfWeek.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${firstDayOfWeek
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    dateEnd: `${lastDayOfWeek.getFullYear()}-${(lastDayOfWeek.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${lastDayOfWeek
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    dayStart: firstDayOfWeek.getDate(),
    dayStartYear: firstDayOfWeek.getFullYear(),
    dayWeekStart: `${(firstDayOfWeek.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${firstDayOfWeek
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    dayWeekEnd: `${(lastDayOfWeek.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${lastDayOfWeek
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    dayStartMonth: firstDayOfWeek.getMonth() + 1,
    dayEnd: lastDayOfWeek.getDate(),
    dayEndYear: lastDayOfWeek.getFullYear(),
    dayEndMonth: lastDayOfWeek.getMonth() + 1,
  };
};
export const getWeeklyArrayDetails = (firstpayDate) => {
  const firstDate = new Date(firstpayDate);
  let firstDayOfWeek = new Date();
  let lastDayOfWeek = new Date();
  let details;
  let week = [];

  while (lastDayOfWeek.getTime() >= firstDate.getTime()) {
    details = getWeekDetails(firstDayOfWeek, lastDayOfWeek);
    week.push({
      dateStart: details.dateStart,
      dateEnd: details.dateEnd,
      dayStart: details.dayStart,
      dayEnd: details.dayEnd,
      dayStartMonth: details.dayStartMonth,
      dayEndMonth: details.dayEndMonth,
      dayStartYear: details.dayStartYear,
      dayEndYear: details.dayEndYear,
    });

    const lastfirstDayOfWeek = new Date(firstDayOfWeek);
    lastfirstDayOfWeek.setDate(lastfirstDayOfWeek.getDate() - 1);
    firstDayOfWeek = new Date(lastfirstDayOfWeek);
    lastDayOfWeek = new Date(lastfirstDayOfWeek);
  }
  return week;
};

export const filterAllSummaryDataByDateGroup = (dataArray, dateGroup) => {
  let summary = {
    data: [],
    expense: 0,
    income: 0,
    category: [],
  };
  dataArray.forEach((el, i) => {
    if (
      new Date(el.date).getTime() >= new Date(dateGroup.dateStart).getTime() &&
      new Date(el.date).getTime() <= new Date(dateGroup.dateEnd).getTime()
    ) {
      summary.data.push(el);
      if (el.type == "expense") {
        summary.expense += el.amount;
      } else {
        summary.income += el.amount;
      }
      if (!summary.category[el.category]) {
        summary.category[el.category] = {
          data: [],
          total: 0,
        };
      }
      summary.category[el.category].data.push(el);
      summary.category[el.category].total += el.amount;
    }
  });

  return {
    data: summary.data,
    expense: parseFloat(summary.expense, 2),
    income: parseFloat(summary.income, 2),
    balance: parseFloat(summary.expense + summary.income, 2),
    category: summary.category,
  };
};

export const getMonthDetails = (currentMonth) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const LastDayOfMonth = new Date(year, month + 1, 0).getDate();

  return {
    monthStart: `${year}-${(month + 1).toString().padStart(2, "0")}-01`,
    monthEnd: `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${LastDayOfMonth}`,
    monthYear: year,
    month: month,
  };
};

export const getMonthlyArrayDetails = (firstpayDate) => {
  const firstDate = new Date(firstpayDate);
  let currentMonth = new Date();
  let month = [];
  while (currentMonth.getTime() >= firstDate.getTime()) {
    let details = getMonthDetails(currentMonth);
    currentMonth = new Date(details.monthStart);
    currentMonth.setDate(currentMonth.getDate() - 1);
    month.push({
      dateStart: details.monthStart,
      dateEnd: details.monthEnd,
      monthYear: details.monthYear,
      month: details.month,
    });
  }
  return month;
};

export const getYearDetails = (currentYear) => {
  const year = currentYear.getFullYear();

  return {
    dateStart: `${year}-01-01`,
    dateEnd: `${year}-12-31`,
    year,
  };
};

export const getYearlyArrayDetails = (firstpayDate) => {
  const firstDate = new Date(firstpayDate);
  let currentYear = new Date();
  let year = [];

  while (currentYear.getTime() >= firstDate.getTime()) {
    let details = getYearDetails(currentYear);
    year.push({
      dateStart: details.dateStart,
      dateEnd: details.dateEnd,
      year: details.year,
    });
    currentYear = new Date(details.dateStart);
    currentYear.setDate(currentYear.getDate() - 1);
  }
  return year;
};
export const filterDataByDateGroup = (dataArray, dateGroup) => {
  let data = [];
  let total = 0;
  const category = [];
  dataArray.forEach((el, i) => {
    if (
      new Date(el.date).getTime() >= new Date(dateGroup.dateStart).getTime() &&
      new Date(el.date).getTime() <= new Date(dateGroup.dateEnd).getTime()
    ) {
      data.push(el);
      total += el.amount;

      if (!category[el.category]) {
        category[el.category] = {
          data: [],
          total: 0,
        };
      }
      category[el.category].data.push(el);
      category[el.category].total += el.amount;
    }
  });
  return { data, total: total.toFixed(2), category };
};

export const filterDataByDateGroupByType = (dataArray, dateGroup, type) => {
  let data = [];
  let total = 0;
  const category = [];
  dataArray.forEach((el, i) => {
    if (
      new Date(el.date).getTime() >= new Date(dateGroup.dateStart).getTime() &&
      new Date(el.date).getTime() <= new Date(dateGroup.dateEnd).getTime()
    ) {
      if (el.type == type) {
        data.push(el);
        total += el.amount;

        if (!category[el.category]) {
          category[el.category] = {
            data: [],
            total: 0,
          };
        }
        category[el.category].data.push(el);
        category[el.category].total += el.amount;
      }
    }
  });
  return { data, total: total.toFixed(2), category };
};

export const addNewDataToExpenseData = (data, newData) => {
  let previousFirstPayDate = new Date(data[data.length - 1].date);
  newData.forEach((item) => {
    const currentPayDate = new Date(item.date);

    if (previousFirstPayDate.getTime() >= currentPayDate.getTime()) {
      previousFirstPayDate = currentPayDate;
      data.push(item);
    } else {
      data.unshift(item);
    }
  });
  return data;
};
export const removeItemFromExpenseArray = (expenseData, singleData) => {
  const findIndex = expenseData.findIndex((el) => el.uuid == singleData.uuid);
  expenseData.splice(findIndex, 1);

  return expenseData;
};

export const updateExpenseSummaryData = (summary, dateGroup, requestData) => {
  // console.log(requestData);
  const date = requestData.date;
  let updatedAmount = 0;
  let chartAmount = 0;

  if (requestData.type == "expense") {
    updatedAmount = Math.abs(requestData.amount) + requestData.newValue;
    chartAmount = updatedAmount > 0 ? -updatedAmount : Math.abs(updatedAmount);
  } else {
    updatedAmount = requestData.newValue - requestData.amount;
  }

  if (new Date(dateGroup.today.date).getTime() == new Date(date).getTime()) {
    if (data.type == "expense") {
      summary.today.expense += updatedAmount;
      summary.today.balance += updatedAmount;
      summary.today.chart[requestData.category] += chartAmount;
    } else {
      summary.today.income += updatedAmount;
      summary.today.balance += updatedAmount;
      summary.today.chart[requestData.category] += updatedAmount;
    }
  }
  if (
    new Date(date).getTime() >= new Date(dateGroup.thisWeek.fWdate).getTime() &&
    new Date(date).getTime() <= new Date(dateGroup.thisWeek.lWdate).getTime()
  ) {
    if (requestData.type == "expense") {
      summary.week.expense += updatedAmount;
      summary.week.balance += updatedAmount;
      summary.week.chart[requestData.category] += chartAmount;
    } else {
      summary.week.income += updatedAmount;
      summary.week.balance += updatedAmount;
      summary.week.chart[requestData.category] += updatedAmount;
    }
  }
  if (
    dateGroup.thisMonth.month == requestData.month &&
    dateGroup.thisMonth.year == requestData.year
  ) {
    if (requestData.type == "expense") {
      summary.month.expense += updatedAmount;
      summary.month.balance += updatedAmount;
      summary.month.chart[requestData.category] += chartAmount;
    } else {
      summary.month.income += updatedAmount;
      summary.month.balance += updatedAmount;
      summary.month.chart[requestData.category] += updatedAmount;
    }
  }
  if (dateGroup.yearNumber == requestData.year) {
    if (requestData.type == "expense") {
      summary.year.expense += updatedAmount;
      summary.year.balance += updatedAmount;
      summary.year.chart[requestData.category] += chartAmount;
    } else {
      summary.year.income += updatedAmount;
      summary.year.balance += updatedAmount;
      summary.year.chart[requestData.category] += updatedAmount;
    }
  }

  summary.balance += updatedAmount;
  console.log("sumary");
  console.log(summary);
  return summary;
};

export const updateItemInExpenseArray = (expenseData, requestData) => {
  const findIndex = expenseData.findIndex((el) => el.uuid == requestData.uuid);
  expenseData[findIndex] = {
    ...expenseData[findIndex],
    amount: requestData.newValue,
  };
  return expenseData;
};
