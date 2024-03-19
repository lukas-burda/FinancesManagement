using FinancesManagement.Server.Domain.Record.Repositories.Interfaces;
using FinancesManagement.Server.Domain.Record.Repository;
using FinancesManagement.Server.Domain.Record.Services;
using FinancesManagement.Server.Domain.Record.Services.Interfaces;
using FinancesManagement.Server.Domain.ResumeTotals.Services;
using FinancesManagement.Server.Domain.ResumeTotals.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IFinancialRecordRepository, FinancialRecordRepository>();
builder.Services.AddScoped<IFinancialRecordService, FinancialRecordService>();
builder.Services.AddScoped<IResumeTotalsService, ResumeTotalsService>();

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
