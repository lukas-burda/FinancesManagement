import { } from "react";
import "./App.css";
import { RecordsTableView } from "../../components/smalls/biggers/RecordsTableView";

// interface FinancialRecord {
//   date: string;
//   amount: number;
//   description: string;
//   classification: string;
// }

function App() {


  return (
    <div>
      <h1 className="text-3xl font-bold underline">Financial Sheet 📊</h1>
      <RecordsTableView />
    </div>
  );
}

export default App;
