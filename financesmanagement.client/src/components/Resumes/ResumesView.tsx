import React from "react";
import { IFinanceSummary } from "../../domain/interface/Resumes/IResume";

interface FinanceSummaryProps {
  financeSummaryData: IFinanceSummary;
}

export const FinanceSummaryView: React.FC<FinanceSummaryProps> = ({
  financeSummaryData,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold mb-2">Entradas</h2>
        <p className="text-xl font-semibold text-green-500">
          {financeSummaryData.incomeAmount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold mb-2">Saídas</h2>
        <p className="text-xl font-semibold text-red-500">
          {financeSummaryData.expenseAmount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold mb-2">Saldo</h2>
        <p className="text-xl font-semibold text-blue-500">
          {financeSummaryData.currentBalance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
};

export default FinanceSummaryView;
