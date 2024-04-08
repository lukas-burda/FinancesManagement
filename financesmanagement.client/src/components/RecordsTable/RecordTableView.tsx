import React, { useState } from "react";
import { FinancialRecord } from "../../domain/interface/Record/IFinancialRecord";
import { FilterOption } from "../../domain/interface/FilterOption/IFilterOption";

interface RecordTableViewProps {
  filterOptionsData: FilterOption[];
  financialRecords: FinancialRecord[];
  repopulateFinancialData: (url?: string) => void;
  updateFinancialRecord: (data: FinancialRecord[]) => void;
}

export const RecordTableView: React.FC<RecordTableViewProps> = ({
  filterOptionsData,
  financialRecords,
  repopulateFinancialData,
  updateFinancialRecord,
}) => {
  function handleFinancialRecordFilterData(url: string) {
    repopulateFinancialData(url);
  }

  async function deleteFinancialRecord(id: number) {
    const response = await fetch("api/FinancialRecords/?id=" + id, {
      method: "DELETE",
    });
    if (response.status == 200) {
      repopulateFinancialData();
    }
  }

  /* Filter */
  const [querySearch, setQuerySearch] = useState("");

  function handleFilterRecord(selected: FilterOption) {
    if (selected.label != "") {
      const url = "fromDate=" + selected.date;
      handleFinancialRecordFilterData(url);
    }
  }

  function handleSearchRecord(query: string) {
    if (financialRecords == undefined) {
      return;
    }
    if (query == "") {
      repopulateFinancialData();
    }
    const result = financialRecords.filter((item) =>
      item.description.includes(query)
    );
    if (result != undefined) {
      updateFinancialRecord(result);
    }
  }

  const table =
    financialRecords != null ? (
      <div className="shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <select
              defaultValue={"All Time"}
              onChange={(e) => {
                const filter = filterOptionsData.find(
                  (f) => f.label == e.currentTarget.value
                );
                if (filter != undefined) {
                  handleFilterRecord(filter);
                }
              }}
              className="inline-flex justify-around text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {filterOptionsData.map((option, index) => (
                <option key={index}>{option.label}</option>
              ))}
            </select>
          </div>
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
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
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                    onClick={() => {
                      deleteFinancialRecord(FinancialRecord.id);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div role="status">
        <svg
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <h1 className="p-5 text-3xl font-bold">Loading Financial Sheet 📊</h1>
      </div>
    );

  return <>{table}</>;
};
