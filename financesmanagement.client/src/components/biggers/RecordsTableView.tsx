import React, { useEffect, useState } from "react";
import { RecordTableInput } from "../smalls/input/RecordTableInput";
import { FinancialRecord } from "../../interface/Record/IFinancialRecord";

export const RecordsTableView: React.FC = () => {
  const [FinancialRecords, setFinancialRecords] = useState<FinancialRecord[]>();

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
    FinancialRecords === undefined ? (
      <p>
        <em>Loading details...</em>
      </p>
    ) : (
      <div className="">
        <table className="">
          <thead className="">
            <tr>
              <th scope="col" className="">
                Date
              </th>
              <th scope="col" className="">
                Description
              </th>
              <th scope="col" className="">
                Amount
              </th>
              <th scope="col" className="">
                Classification
              </th>
            </tr>
          </thead>
          <tbody>
            {FinancialRecords.map((FinancialRecord) => (
              <tr
                className=""
                key={FinancialRecord.id}
              >
                <td className="px-6 py-4">{FinancialRecord.date.toString()}</td>
                <th
                  scope="row"
                  className=""
                >
                  {FinancialRecord.description}
                </th>
                <td className="">{FinancialRecord.amount}</td>
                <td className="">{FinancialRecord.classification}</td>
                <td className="">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4">
                  <a
                    onClick={() => {
                      deleteFinancialRecord(FinancialRecord.id);
                    }}
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <RecordTableInput/>
      </div>
    );

  return <>{table}</>;
};
