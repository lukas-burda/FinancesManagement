import { FinancialRecord } from "../../interface/Record/IFinancialRecord";

export class FinancialRecordClass implements FinancialRecord {
  id: number;
  date: string;
  amount: number;
  description: string;
  classification: string;

  constructor(id: number, date: string, amount: number, description: string, classification: string) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.description = description;
    this.classification = classification;
  }
}