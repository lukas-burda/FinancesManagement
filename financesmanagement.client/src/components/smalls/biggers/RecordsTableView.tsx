import React, { useEffect, useState } from "react";

interface FinancialRecord {
  date: string;
  amount: number;
  description: string;
  classification: string;
}

export const RecordsTableView: React.FC = () => {
  const [FinancialRecords, setFinancialRecords] = useState<FinancialRecord[]>();

  const filterOptions = [
    "Last 30 days",
    "Last Month",
    "Last 6 Months",
    "Last 1 year",
  ];

  useEffect(() => {
    populateFinancialData();
  }, []);

  async function populateFinancialData() {
    const response = await fetch("api/FinancialRecords/records");
    const data = await response.json();
    setFinancialRecords(data);
  }

  const table =
    FinancialRecords === undefined ? (
      <p>
        <em>Loading details...</em>
      </p>
    ) : (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Classification
              </th>
            </tr>
          </thead>
          <tbody>
            {FinancialRecords.map((FinancialRecord) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{FinancialRecord.date}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {FinancialRecord.description}
                </th>
                <td className="px-6 py-4">{FinancialRecord.amount}</td>
                <td className="px-6 py-4">{FinancialRecord.classification}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return <>{table}</>;
};
