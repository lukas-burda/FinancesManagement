const currentDate = new Date();
  const lastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );
  const lastSixMonthsDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 6,
    currentDate.getDate()
  );
  const lastYearDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  );

 export const filterOptionsData = [
    {
      label: "All Time",
      date: "",
    },
    {
      label: "Last Month",
      date: lastMonthDate.toISOString(),
    },
    {
      label: "Last Six Months",
      date: lastSixMonthsDate.toISOString(),
    },
    {
      label: "Last Year",
      date: lastYearDate.toISOString(),
    },
  ]