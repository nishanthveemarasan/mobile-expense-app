import { monthsName } from "../constants/months";
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

  return { data, total: total, category };
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
export const getWeeklyArrayDetails = (firstpayDate, lastPayDate) => {
  const firstDate = new Date(firstpayDate);
  let firstDayOfWeek = new Date(lastPayDate);
  let lastDayOfWeek = new Date(lastPayDate);
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

export const getMonthlyArrayDetails = (firstpayDate, lastPayDate) => {
  const firstDate = new Date(firstpayDate);
  let currentMonth = new Date(lastPayDate);
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

export const getYearlyArrayDetails = (firstpayDate, lastPayDate) => {
  const firstDate = new Date(firstpayDate);
  let currentYear = new Date(lastPayDate);
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
  if (data.length == 0) {
    if (newData.length == 1) {
      data.push(newData[0]);
    } else {
      let previousFirstPayDate = new Date(newData[newData.length - 1].date);
      let previousLastPayDate = new Date(newData[0].date);
      newData.forEach((item) => {
        const currentPayDate = new Date(item.date);
        if (previousFirstPayDate.getTime() >= currentPayDate.getTime()) {
          previousFirstPayDate = currentPayDate;
          data.push(item);
        } else if (previousLastPayDate.getTime() <= currentPayDate.getTime()) {
          data.unshift(item);
        } else {
          let lastIndex = data.length - 1;
          data.splice(lastIndex - 1, 0, item);
        }
      });
    }
  } else {
    let previousFirstPayDate = new Date(data[data.length - 1].date);
    let previousLastPayDate = new Date(data[0].date);
    newData.forEach((item) => {
      const currentPayDate = new Date(item.date);

      if (previousFirstPayDate.getTime() >= currentPayDate.getTime()) {
        previousFirstPayDate = currentPayDate;
        data.push(item);
      } else if (previousLastPayDate.getTime() <= currentPayDate.getTime()) {
        data.unshift(item);
      } else {
        let lastIndex = data.length - 1;
        data.splice(lastIndex - 1, 0, item);
      }
    });
  }
  return data;
};
export const removeItemFromExpenseArray = (expenseData, singleData) => {
  const findIndex = expenseData.findIndex((el) => el.uuid == singleData.uuid);
  expenseData.splice(findIndex, 1);

  return expenseData;
};

export const updateExpenseSummaryData = (summary, dateGroup, requestData) => {
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
    if (requestData.type == "expense") {
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
export const getMOnthlyExpenses = (data, year) => {
  const monthsData = [];
  const category = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (item.year == year) {
      const m = Math.abs(item.month) - 1;
      const month = monthsName[m];

      if (!monthsData[month]) {
        monthsData[month] = { expense: 0, income: 0, category: [] };
      }

      if (!monthsData[month].category[item.category]) {
        monthsData[month].category[item.category] = 0;
      }

      if (item.type == "expense") {
        monthsData[month].expense += Math.abs(item.amount);
      } else {
        monthsData[month].income += item.amount;
      }
      monthsData[month].category[item.category] += Math.abs(item.amount);

      if (!category.includes(item.category)) {
        category.push(item.category);
      }
    }
  }

  return { monthsData, category };
};

export const getMonthlySummaryChartData = (data, year) => {
  const summaryData = [];
  const getData = getMOnthlyExpenses(data, year);
  const monthlyData = getData.monthsData;
  const categories = getData.category;
  const categoryChartData = [];

  for (let i = 0; i < monthsName.length; i++) {
    const month = monthsName[i];
    if (monthlyData[month]) {
      summaryData[month] = monthlyData[month];
    } else {
      summaryData[month] = { expense: 0, income: 0, category: [] };
    }
    categories.forEach((category) => {
      if (!categoryChartData[category]) {
        categoryChartData[category] = [];
      }
      if (!summaryData[month].category[category]) {
        categoryChartData[category].push(0);
      } else {
        categoryChartData[category].push(
          restrictDecimalPlace(summaryData[month].category[category])
        );
      }
    });
  }
  return { summaryData, categoryChartData, categories };
};

const getCurrentMonthWithYear = () => {
  const date = new Date();
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

export const extractMonthlyExpenseIncomeDataValues = (data, selectedYear) => {
  const currentDate = getCurrentMonthWithYear();

  const expense = [];
  const income = [];
  let chartYIncomeAxis = [];
  let chartYExpenseAxis = [];

  let totalIncome = 0;
  let totalExpense = 0;
  let totalBalance = 0;
  // let NoOfMonthsSpended = 0;

  monthsName.forEach((month, i) => {
    let currentMonthExpense = restrictDecimalPlace(data[month].expense);
    let currentMonthIncome = restrictDecimalPlace(data[month].income);
    totalIncome += currentMonthIncome;
    totalExpense += currentMonthExpense;
    if (i == 0) {
      chartYIncomeAxis.push(null);
      chartYExpenseAxis.push(null);
    }
    if (selectedYear == currentDate.year) {
      if (i <= currentDate.month) {
        chartYIncomeAxis.push(restrictDecimalPlace(totalIncome));
        chartYExpenseAxis.push(restrictDecimalPlace(totalExpense));
        // if (currentMonthExpense > 0) NoOfMonthsSpended += 1;
      } else {
        chartYIncomeAxis.push(null);
        chartYExpenseAxis.push(null);
      }
    } else {
      // if (currentMonthExpense > 0) NoOfMonthsSpended += 1;
      chartYIncomeAxis.push(restrictDecimalPlace(totalIncome));
      chartYExpenseAxis.push(restrictDecimalPlace(totalExpense));
    }

    expense.push(restrictDecimalPlace(data[month].expense));

    income.push(restrictDecimalPlace(data[month].income));
  });
  let foramattedTotalIncome = restrictDecimalPlace(totalIncome);
  let foramattedTotalExpense = restrictDecimalPlace(totalExpense);
  let balance = foramattedTotalIncome - foramattedTotalExpense;
  const summaryChartInTotal = {
    series: [
      {
        data: chartYIncomeAxis,
        color: (opacity = 1) => `rgba(10, 94, 7, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: chartYExpenseAxis,
        color: (opacity = 1) => `rgba(163, 15, 5, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legends: ["Income", "Expense"],
    totalIncome: foramattedTotalIncome,
    totalExpense: foramattedTotalExpense,
    totalBalance: balance,
    // avgSpending: restrictDecimalPlace(totalExpense / NoOfMonthsSpended),
    labels: monthsName,
  };
  return {
    series: [
      {
        data: income,
        color: (opacity = 1) => `rgba(8, 92, 8, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: expense,
        color: (opacity = 1) => `rgba(163, 15, 5, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legends: ["Income", "Expense"],

    summaryChartInTotal,
  };
};

const getLabelsForTotal = (array) => {
  array.unshift("");
  return array;
};

export const getWeekStartEndDetails = (firstDayOfWeek) => {
  const lastDayOfWeek = new Date(firstDayOfWeek);
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

const getWeeklyArrayChartDetails = (firstpayDate, lastPayDate, givenDate) => {
  let firstDayOfWeek = new Date(firstpayDate);
  let lastDayWeek = new Date(lastPayDate);
  let details;
  let week = [];
  let currentWeek = "";
  const today = new Date(givenDate).getTime();

  let i = 1;
  while (firstDayOfWeek.getTime() <= lastDayWeek.getTime()) {
    details = getWeekStartEndDetails(firstDayOfWeek);
    if (
      today >= new Date(details.dateStart).getTime() &&
      today <= new Date(details.dateEnd).getTime() &&
      !currentWeek
    ) {
      currentWeek = `week${i}`;
    }

    week.push({
      dateStart: details.dateStart,
      dateEnd: details.dateEnd,
      dayStart: details.dayStart,
      dayEnd: details.dayEnd,
      weekRange: `${details.dayWeekStart} - ${details.dayWeekEnd}`,
      week: `week${i}`,
      dayStartMonth: details.dayStartMonth,
      dayEndMonth: details.dayEndMonth,
      dayStartYear: details.dayStartYear,
      dayEndYear: details.dayEndYear,
    });

    const lastfirstDayOfWeek = new Date(details.dateEnd);
    lastfirstDayOfWeek.setDate(lastfirstDayOfWeek.getDate() + 1);
    firstDayOfWeek = new Date(lastfirstDayOfWeek);
    i++;
  }

  return { week, currentWeek };
};

export const weeklyChartData = (data, firstpayDate, lastPayDate, today) => {
  const weeklyDetails = getWeeklyArrayChartDetails(
    firstpayDate,
    lastPayDate,
    today
  );
  const weeklyArrayDetails = weeklyDetails.week;
  const currentWeek = weeklyDetails.currentWeek;

  const weeklyChartData = [];
  const category = [];
  let limit = 0;
  data.forEach((item) => {
    weeklyArrayDetails.forEach((week) => {
      if (!weeklyChartData[week.week]) {
        weeklyChartData[week.week] = {
          expense: 0,
          income: 0,
          weekRange: week.weekRange,
          category: [],
        };
      }
      const dayStart = new Date(week.dateStart).getTime();
      const dateEnd = new Date(week.dateEnd).getTime();
      if (
        new Date(item.date).getTime() >= dayStart &&
        new Date(item.date).getTime() <= dateEnd
      ) {
        const amount = Math.abs(item.amount);

        if (amount > limit) {
          limit = amount;
        }
        if (!weeklyChartData[week.week].category[item.category]) {
          weeklyChartData[week.week].category[item.category] = 0;
        }
        if (item.type.toLowerCase() == "expense") {
          weeklyChartData[week.week].expense += amount;
        } else {
          weeklyChartData[week.week].income += amount;
        }
        weeklyChartData[week.week].category[item.category] += amount;

        if (!category.includes(item.category)) {
          category.push(item.category);
        }
        return;
      }
    });
  });

  return { weeklyChartData, category, limit, currentWeek };
};

export const generateWeeklyExpenseAndIncomeChartColumnData = (data) => {
  const labels = [];
  let expense = [];
  let income = [];
  let categoryWise = [];

  let totalIncome = 0;
  let totalExpense = 0;
  let NoOfWeeksSpended = 0;

  let chartYIncomeAxis = [];
  let chartYExpenseAxis = [];

  const weeklyChartData = data.weeklyChartData;
  const currentWeek = data.currentWeek;
  const currentWeekLastIndex = currentWeek.slice(-1);
  const currentWeekIndex = currentWeekLastIndex ? currentWeekLastIndex : 0;

  const weeklyChartCategory = data.category;
  let i = 1;
  for (let weekly in weeklyChartData) {
    let key = `week${i}`;
    // console.log(currentWeekIndex, i);
    const chartKey = weeklyChartData[key];
    let chartKeyExpense = restrictDecimalPlace(chartKey.expense);
    let chartKeyIncome = restrictDecimalPlace(chartKey.income);
    totalIncome += chartKeyIncome;
    totalExpense += chartKeyExpense;
    if (i == 1) {
      // chartYIncomeAxis.push(null);
      // chartYExpenseAxis.push(null);
    }
    if (currentWeekIndex == 0) {
      chartYIncomeAxis.push(restrictDecimalPlace(totalIncome));
      chartYExpenseAxis.push(restrictDecimalPlace(totalExpense));
      if (chartKeyExpense > 0) {
        NoOfWeeksSpended += 1;
      }
    } else {
      if (i <= currentWeekIndex) {
        chartYIncomeAxis.push(restrictDecimalPlace(totalIncome));
        chartYExpenseAxis.push(restrictDecimalPlace(totalExpense));
        if (chartKeyExpense > 0) {
          NoOfWeeksSpended += 1;
        }
      } else {
        // chartYIncomeAxis.push(null);
        // chartYExpenseAxis.push(null);
      }
    }

    // if (chartKeyExpense > 0) {
    //     NoOfWeeksSpended += 1;
    // }
    labels.push(chartKey.weekRange);

    expense.push(chartKeyExpense);
    income.push(chartKeyIncome);

    weeklyChartCategory.forEach((category) => {
      if (!categoryWise[category]) {
        categoryWise[category] = [];
      }
      const value = chartKey.category[category]
        ? restrictDecimalPlace(chartKey.category[category])
        : 0;

      categoryWise[category].push(value);
    });
    i++;
  }

  const series = [
    {
      data: income,
      color: (opacity = 1) => `rgba(10, 94, 7, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: expense,
      color: (opacity = 1) => `rgba(163, 15, 5, ${opacity})`,
      strokeWidth: 2,
    },
  ];

  const legends = ["Income", "Expense"];

  const seriesForTotal = [
    {
      data: chartYIncomeAxis,
      color: (opacity = 1) => `rgba(10, 94, 7, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: chartYExpenseAxis,
      color: (opacity = 1) => `rgba(163, 15, 5, ${opacity})`,
      strokeWidth: 2,
    },
  ];
  const tIncome = restrictDecimalPlace(totalIncome);
  const tExpense = restrictDecimalPlace(totalExpense);
  const summary = {
    income: restrictDecimalPlace(totalIncome),
    expense: restrictDecimalPlace(totalExpense),
    balance: tIncome - tExpense,
  };

  const summaryChartInTotal = {
    seriesForTotal,
  };
  return {
    series,
    legends,
    labels,
    categoryWise,
    summary,
    summaryChartInTotal,
  };
};

export const padStart = (num) => {
  return num.toString().padStart(2, "0");
};
