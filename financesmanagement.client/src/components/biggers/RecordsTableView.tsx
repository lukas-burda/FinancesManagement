import React, { useEffect, useState } from "react";
import { RecordTableInput } from "../smalls/input/RecordTableInput";
import { FinancialRecord } from "../../interface/Record/IFinancialRecord";

export const RecordsTableView: React.FC = () => {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>();

  useEffect(() => {
    populateFinancialData();
  }, []);

  async function populateFinancialData() {
    const response = await fetch("api/FinancialRecords/records");
    const data = await response.json();
    setFinancialRecords(data);
  }

  async function deleteFinancialRecord(id: number) {
    const response = await fetch("api/FinancialRecords/?id=" + id, {
      method: "DELETE",
    });
    if (response.status == 200) {
      populateFinancialData();
    }
  }

  const table =
    financialRecords != null ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
              <th scope="col" className="py-3 px-6">
                Classification
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {financialRecords.map((FinancialRecord) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={FinancialRecord.id}
              >
                <td className="py-2 px-6">{FinancialRecord.date}</td>
                <th
                  scope="row"
                  className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {FinancialRecord.description}
                </th>
                <td className="py-2 px-6">{FinancialRecord.amount}</td>
                <td className="py-2 px-6">{FinancialRecord.classification}</td>
                <td className="py-2 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => {
                      deleteFinancialRecord(FinancialRecord.id);
                    }}
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <RecordTableInput repopulateList={populateFinancialData} />
      </div>
    ) : (
      <h1>Loading...</h1>
    );

  return <>{table}</>;
};
