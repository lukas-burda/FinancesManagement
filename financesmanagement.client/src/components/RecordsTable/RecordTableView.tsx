import React, { useEffect, useState } from "react";
import { RecordTableInput } from "./RecordTableInput";
import { FinancialRecord } from "../../domain/interface/Record/IFinancialRecord";
import { FilterOption } from "../../domain/interface/FilterOption/IFilterOption";

export const RecordTableView: React.FC = () => {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>();

  useEffect(() => {
    populateFinancialData();
  }, []);

  async function populateFinancialData() {
    const response = await fetch("api/FinancialRecords/records");
    const data = await response.json();
    setFinancialRecords(data);
  }

  async function populateFinancialDataFiltered(url: string) {
    const response = await fetch("api/FinancialRecords/records?" + url);
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

  /* Filter */
  function handleFilterRecord(selected: FilterOption) {
    if (selected.label != "") {
      let url = "fromDate=" + selected.date;
      populateFinancialDataFiltered(url);
    }
  }

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

  const [options, setOptions] = useState<FilterOption[]>([
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
  ]);

  /* Search */

  function handleSearchRecord(query: string) {
    if (financialRecords == undefined) {
      return;
    }
    const result = financialRecords.filter((item) =>
      item.description.includes(query)
    );
    if (result != undefined) {
      setFinancialRecords(result);
    }
  }
  const [querySearch, setQuerySearch] = useState("");

  const table =
    financialRecords != null ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <select
              defaultValue={"Last Month"}
              onChange={(e) => {
                const filter = options.find(
                  (f) => f.label == e.currentTarget.value
                );
                if (filter != undefined) {
                  handleFilterRecord(filter);
                }
              }}
              className="inline-flex justify-around text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {options.map((option, index) => (
                <option key={index}>{option.label}</option>
              ))}
            </select>
          </div>
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault()
              handleSearchRecord(querySearch);
            }}
          >
            <button
              type="button"
              className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"
            >
              🔎
            </button>
            <input
              type="text"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) => {
                setQuerySearch(e.currentTarget.value || "");
              }}
            ></input>
          </form>
        </div>
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
                <td className="py-2 px-6">
                  {new Date(FinancialRecord.date).toLocaleDateString()}
                </td>
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
      <h1 className="p-5 text-3xl font-bold">Loading financial sheet 📊...</h1>
    );

  return <>{table}</>;
};
