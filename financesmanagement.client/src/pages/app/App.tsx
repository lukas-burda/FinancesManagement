import {} from "react";
import "./App.css";
import { RecordTableView } from "../../components/RecordsTable/RecordTableView";

// interface FinancialRecord {
//   date: string;
//   amount: number;
//   description: string;
//   classification: string;
// }

function App() {
  return (
    <div>
      <RecordTableView />
    </div>
  );
}

export default App;
