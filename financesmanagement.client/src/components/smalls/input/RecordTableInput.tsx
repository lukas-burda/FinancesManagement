import { useState } from "react";
import { FinancialRecordClass } from "../../../model/FinancialRecord/FinancialRecord";

export const RecordTableInput: React.FC = () => {
  const [financialRecord, setFinancialRecord] = useState<FinancialRecordClass>(
    new FinancialRecordClass(1, '', 0, "", "")
  );

  const [classifications,setClassifications] = useState<string[]>([])

  async function AddFinancialRecord(financialRecord: FinancialRecordClass) {
    if (financialRecord != null) {
      const response = await fetch("api/FinancialRecords/", {
        method: "POST",
        headers:{ 'Content-Type' : 'application/json'},
        body: JSON.stringify(financialRecord),
      });
    }
  }

  async function GetClassificationTypes(){
    const response = await fetch("api/FinancialRecords/existentClassifications")
    const data = await response.json();
    setClassifications(data);
  }

  return (
    <form className="flex">
      <input
        className="p-2 m-2 border rounded-md"
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
        className="p-2 m-2 border rounded-md"
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
      <input
        className="p-2 m-2 border rounded-md"
        type="numeric"
        placeholder="Amount"
        value={financialRecord.amount}
        onChange={(e) =>
          setFinancialRecord({
            ...financialRecord,
            amount: parseFloat(e.currentTarget?.value),
          })
        }
      />
      <select className="p-2 m-2 border rounded-md" id="mySelect" name="options" onClick={()=>{GetClassificationTypes()}}>
        {classifications.map((classification,index) => (
          <option key={index} value={classification.toString()}>{classification}</option>
        ))}
      </select>
      <a
        type="submit"
        href="#"
        onClick={() => {
          AddFinancialRecord(financialRecord);
        }}
      >
        Add
      </a>
    </form>
  );
};
