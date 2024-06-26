﻿using FinancesManagement.Server.Domain.Models;
using FinancesManagement.Server.Domain.Record.Models;
using FinancesManagement.Server.Domain.Record.Repositories.Interfaces;
using Npgsql;

namespace FinancesManagement.Server.Domain.Record.Repository
{
    public class FinancialRecordRepository : IFinancialRecordRepository
    {

        private readonly IConfiguration _configuration;

        public FinancialRecordRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetConnectionString()
        {
            return _configuration.GetConnectionString("postgres");
        }

        public async Task<IEnumerable<FinancialRecordModel>> GetAllRecords()
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var command = new NpgsqlCommand("SELECT * FROM FinancialRecords", connection);
                var reader = await command.ExecuteReaderAsync();

                var records = new HashSet<FinancialRecordModel>();

                while (await reader.ReadAsync())
                {
                    records.Add(new FinancialRecordModel
                    {
                        Id = reader.GetInt32(0),
                        Date = reader.GetDateTime(1),
                        Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                        Amount = reader.GetDecimal(3),
                        Classification = reader.IsDBNull(4) ? null : reader.GetString(4)
                    });
                }

                return records;
            }
        }

        public async Task<IEnumerable<FinancialRecordModel>> GetAllRecordsWithClassifications()
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var command = new NpgsqlCommand("SELECT * FROM FinancialRecords WHERE Classification is not null", connection);
                var reader = await command.ExecuteReaderAsync();

                var records = new HashSet<FinancialRecordModel>();

                while (await reader.ReadAsync())
                {
                    records.Add(new FinancialRecordModel
                    {
                        Id = reader.GetInt32(0),
                        Date = reader.GetDateTime(1),
                        Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                        Amount = reader.GetDecimal(3),
                        Classification = reader.IsDBNull(4) ? null : reader.GetString(4)
                    });
                }

                return records;
            }
        }

        public async Task<IEnumerable<FinancialRecordModel>> GetRecordsFiltered(QueryOptionsFilter queryOptions)
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var query = "SELECT * FROM FinancialRecords WHERE 1 = 1";

                if (queryOptions.FromDate.HasValue)
                    query += " AND Date >= @FromDate";

                if (queryOptions.ToDate.HasValue)
                    query += " AND Date <= @ToDate";

                if (!string.IsNullOrEmpty(queryOptions.Classification))
                    query += " AND Classification = @Classification";

                if (!string.IsNullOrEmpty(queryOptions.OrderBy) && !string.IsNullOrEmpty(queryOptions.OrderAscending))
                {
                    if (bool.Parse(queryOptions.OrderAscending))
                    {
                        query += $" ORDER BY {queryOptions.OrderBy} ASC";
                    }
                    else
                    {
                        query += $" ORDER BY {queryOptions.OrderBy} DESC";
                    }
                }

                var command = new NpgsqlCommand(query, connection);

                if (queryOptions.FromDate.HasValue)
                    command.Parameters.AddWithValue("@FromDate", queryOptions.FromDate.Value);

                if (queryOptions.ToDate.HasValue)
                    command.Parameters.AddWithValue("@ToDate", queryOptions.ToDate.Value);

                if (!string.IsNullOrEmpty(queryOptions.Classification))
                    command.Parameters.AddWithValue("@Classification", queryOptions.Classification);

                var reader = await command.ExecuteReaderAsync();

                var records = new List<FinancialRecordModel>();

                while (await reader.ReadAsync())
                {
                    records.Add(new FinancialRecordModel
                    {
                        Id = reader.GetInt32(0),
                        Date = reader.GetDateTime(1),
                        Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                        Amount = reader.GetDecimal(3),
                        Classification = reader.IsDBNull(4) ? null : reader.GetString(4)
                    });
                }

                return records;
            }
        }

        public async Task<FinancialRecordModel> GetRecordById(int id)
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var command = new NpgsqlCommand("SELECT * FROM FinancialRecords WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);
                var reader = await command.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    return new FinancialRecordModel
                    {
                        Id = reader.GetInt32(0),
                        Date = reader.GetDateTime(1),
                        Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                        Amount = reader.GetDecimal(3),
                        Classification = reader.IsDBNull(4) ? null : reader.GetString(4)
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        public async Task AddRecord(FinancialRecordModel record)
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var command = new NpgsqlCommand("INSERT INTO FinancialRecords (Date, Description, Amount, Classification) VALUES (@Date, @Description, @Amount, @Classification)", connection);
                command.Parameters.AddWithValue("@Date", record.Date);
                command.Parameters.AddWithValue("@Description", (object)record.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@Amount", record.Amount);
                command.Parameters.AddWithValue("@Classification", (object)record.Classification ?? DBNull.Value);
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateRecord(FinancialRecordModel record)
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var command = new NpgsqlCommand("UPDATE FinancialRecords SET Date = @Date, Description = @Description, Amount = @Amount, Classification = @Classification WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Date", record.Date);
                command.Parameters.AddWithValue("@Description", (object)record.Description ?? DBNull.Value);
                command.Parameters.AddWithValue("@Amount", record.Amount);
                command.Parameters.AddWithValue("@Classification", (object)record.Classification ?? DBNull.Value);
                command.Parameters.AddWithValue("@Id", record.Id);
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task DeleteRecord(int id)
        {
            using (var connection = new NpgsqlConnection(GetConnectionString()))
            {
                await connection.OpenAsync();
                var command = new NpgsqlCommand("DELETE FROM FinancialRecords WHERE Id = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);
                await command.ExecuteNonQueryAsync();
            }
        }
    }
}
