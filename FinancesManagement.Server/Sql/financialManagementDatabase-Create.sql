CREATE DATABASE financialManagementDatabase

CREATE TABLE FinancialRecords (
    Id SERIAL PRIMARY KEY,
    Date TIMESTAMP NOT NULL,
    Description TEXT,
    Amount DECIMAL NOT NULL,
    Classification TEXT
);