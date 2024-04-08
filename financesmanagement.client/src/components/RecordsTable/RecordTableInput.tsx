import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import { FinancialRecordClass } from "../../domain/model/FinancialRecord/FinancialRecord";

interface RecordTableInputProps {
  repopulateFinancialData(): void;
}

export const RecordTableInput: React.FC<RecordTableInputProps> = ({
  repopulateFinancialData
}) => {
  const [financialRecord, setFinancialRecord] = useState<FinancialRecordClass>(
    new FinancialRecordClass(1, "", 0, "", "")
  );

  const [classifications, setClassifications] = useState<string[]>([]);

  function isValidRecord(record: FinancialRecordClass) {
    return record.amount != 0 && record.description != "" ? true : false;
  }

  async function AddFinancialRecord(financialRecord: FinancialRecordClass) {
    if (isValidRecord(financialRecord)) {
      const response = await fetch("api/FinancialRecords/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(financialRecord),
      });
      if (response.ok) {
        repopulateFinancialData();
      }
    }
  }

  async function GetClassificationTypes() {
    if (classifications.length == 0) {
      const response = await fetch(
        "api/FinancialRecords/existentClassifications"
      );
      const data = await response.json();
      setClassifications(data);
    }
  }

  return (
    <form className="w-full flex justify-around text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <input
        required
        itemScope={true}
        className="p-2 m-2 rounded-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        type="date"
        placeholder="Date"
        value={financialRecord.date}
        onChange={(e) =>
          setFinancialRecord({
            ...financialRecord,
            date: e.currentTarget?.value || "",
          })
        }
      />
      <input
        required
        className="p-2 m-2 px-5 rounded-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        type="text"
        placeholder="Description"
        value={financialRecord.description}
        onChange={(e) =>
          setFinancialRecord({
            ...financialRecord,
            description: e.currentTarget?.value || "",
          })
        }
      />

      <CurrencyInput
        required
        className="p-2 m-2 px-lg-5 rounded-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        placeholder="-R$ 0.00"
        prefix="R$ "
        step={0.01}
        decimalsLimit={2}
        onValueChange={(_value, _name, values) =>
          setFinancialRecord({
            ...financialRecord,
            amount: values?.float ?? 0,
          })
        }
      />
      <select
        className="p-2 m-2 px-8 rounded-md text-gray-700bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        name="options"
        onClick={() => {
          GetClassificationTypes();
        }}
        onChange={(e) => {
          setFinancialRecord({
            ...financialRecord,
            classification: e.currentTarget?.value || "",
          });
        }}
      >
        {classifications.map((string, index) => (
          <option key={index} value={string}>
            {string}
          </option>
        ))}
      </select>
      <button
        className="px-6 m-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded"
        type="submit"
        onClick={() => {
          AddFinancialRecord(financialRecord);
        }}
      >
        Add
      </button>
    </form>
  );
};
