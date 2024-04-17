import "./App.css";
import { RecordTableView } from "../../components/RecordsTable/RecordTableView";
import ResumesView from "../../components/Resumes/ResumesView";
import { filterOptionsData } from "../../components/RecordsTable/RecordTableFilterOptions";
import { useEffect, useState } from "react";
import { FinancialRecord } from "../../domain/interface/Record/IFinancialRecord";
import { RecordTableInput } from "../../components/RecordsTable/RecordTableInput";
import { IFinanceSummary } from "../../domain/interface/Resumes/IResume";

function App() {
  const [financialSummary, setFinancialSummary] = useState<IFinanceSummary>({
    currentBalance: 0,
    expenseAmount: 0,
    incomeAmount: 0,
  });

  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>(
    []
  );

  const handleRefreshData = (value: FinancialRecord[]) => {
    setFinancialRecords(value);
  };

  async function populateResumeData(url?: string) {
    if (url == undefined) url = "";
    const response = await fetch("api/Resume/totals?" + url);
    const data = await response.json();
    setFinancialSummary(data);
  }

  async function populateFinancialData(url?: string) {
    if (url == undefined) url = "";
    const response = await fetch("api/FinancialRecords/records?" + url);
    const data = await response.json();
    setFinancialRecords(data);
    populateResumeData(url);
  }

  useEffect(
    () => {
      populateFinancialData();
      // console.log('i fire once') /* React.Strict on dev server? */
    },
    [] /* dont remove empty array depencies > cause: populateFinancialData loop */
  );

  return (
    <div className="flex-inline justify-content-center p-6">
      <div className="py-5">
        <ResumesView financeSummaryData={financialSummary} />
      </div>
      <div>
        <RecordTableView
          filterOptionsData={filterOptionsData}
          financialRecords={financialRecords}
          repopulateFinancialData={populateFinancialData}
          updateFinancialRecord={handleRefreshData}
        />
        <RecordTableInput repopulateFinancialData={populateFinancialData} />
      </div>
    </div>
  );
}

export default App;
