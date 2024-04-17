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
  const [querySearch, setQuerySearch] = useState('');

  function handleFilterRecord(selected: FilterOption) {
    if (selected.label != "") {
      const url = "fromDate=" + selected.date;
      handleFinancialRecordFilterData(url);
    }
  }

  function handleSearchRecord(query: string) {
    if (query == "" || query == null || query == undefined) {
      repopulateFinancialData();
    } else {
      const result = financialRecords.filter((item) =>
        item.description.includes(query)
      );
      if (result != undefined && result.length > 0) {
        updateFinancialRecord(result);
      }
    }
  }

  const table = (
    <div className="shadow-md sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div>
          <select
            defaultValue={"Todo tempo"}
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
              Data
            </th>
            <th scope="col" className="py-3 px-6">
              Descrição
            </th>
            <th scope="col" className="py-3 px-6">
              Valor
            </th>
            <th scope="col" className="py-3 px-6">
              Classificação
            </th>
            <th scope="col" className="py-3 px-6"> </th>
          </tr>
        </thead>
        <tbody>
          {financialRecords.map((financialRecord) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={financialRecord.id}
            >
              <td className="py-2 px-6">
                {new Date(financialRecord.date).toLocaleDateString()}
              </td>
              <th
                scope="row"
                className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {financialRecord.description}
              </th>
              <td className="py-2 px-6">
                {financialRecord.amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td className="py-2 px-6">{financialRecord.classification}</td>
              <td className="py-2 px-6">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Editar
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                  onClick={() => {
                    deleteFinancialRecord(financialRecord.id);
                  }}
                >
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return <div>{table}</div>;
};
