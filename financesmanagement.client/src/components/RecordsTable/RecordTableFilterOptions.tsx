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
      label: "Todo Tempo",
      date: "",
    },
    {
      label: "Último Mês",
      date: lastMonthDate.toISOString(),
    },
    {
      label: "Últimos 6 Meses",
      date: lastSixMonthsDate.toISOString(),
    },
    {
      label: "Último Ano",
      date: lastYearDate.toISOString(),
    },
  ]