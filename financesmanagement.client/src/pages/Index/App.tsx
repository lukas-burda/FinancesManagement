import {} from "react";
import "./App.css";
import { RecordsTableView } from "../../components/biggers/RecordsTableView";

// interface FinancialRecord {
//   date: string;
//   amount: number;
//   description: string;
//   classification: string;
// }

function App() {
  return (
    <div>
      <h1 className="p-5 text-3xl font-bold">Financial Sheet 📊</h1>
      <RecordsTableView />
    </div>
  );
}

export default App;
