import { useEffect, useState } from 'react';
import './App.css';

interface FinancialRecord {
    date: string;
    amount: number;
    description: string;
    classification: string;
}

function App() {
    const [FinancialRecords, setFinancialRecords] = useState<FinancialRecord[]>();

    useEffect(() => {
        populateFinancialData();
    }, []);

    const contents = FinancialRecords === undefined
        ? <p><em>Loading details...</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Classification</th>
                </tr>
            </thead>
            <tbody>
                {FinancialRecords.map(FinancialRecord =>
                    <tr key={FinancialRecord.date}>
                        <td>{FinancialRecord.date}</td>
                        <td>{FinancialRecord.description}</td>
                        <td>{FinancialRecord.amount}</td>
                        <td>{FinancialRecord.classification}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">FinancialRecords</h1>
            {contents}
        </div>
    );

    async function populateFinancialData() {
        const response = await fetch('api/FinancialRecords/records');
        const data = await response.json();
        setFinancialRecords(data);
    }
}

export default App;