using ResidenceService.Api.Infrastructure.database.context;
using ResidenceService.Api.Infrastructure.database.repositories;
using ResidenceService.Api.Domain.interfaces;
using ResidenceService.Api.Application.use_cases.companies;
using ResidenceService.Api.Application.use_cases.companyContacts;
using ResidenceService.Api.Application.use_cases.projects;
using ResidenceService.Api.Application.use_cases.projectAssignments;
using ResidenceService.Api.Application.use_cases.deliverables;
using ResidenceService.Api.Application.use_cases.deliverableAssignments;
using ResidenceService.Api.Application.use_cases.deliverableSubmissions;
using ResidenceService.Api.Application.use_cases.companyRatings;
using ResidenceService.Api.Infrastructure.services;


using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// JWT Configuration
var jwtSecret = "4f7b19d4c79d4912510f44b826b102a0956485ef6a5ce3bcb96a97e71a36ed1000312eb581a2f37473ed8373bc0905500d2375e23125647f788ee3b0ee4a9e1a";
var key = Encoding.ASCII.GetBytes(jwtSecret);

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        NameClaimType = "email",
        RoleClaimType = "role" // NestJS uses 'role'
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("role", "ADMIN"));
    options.AddPolicy("StudentOnly", policy => policy.RequireClaim("type", "STUDENT"));
    options.AddPolicy("TutorOnly", policy => policy.RequireClaim("type", "TUTOR"));
    options.AddPolicy("AdminOrStudent", policy => policy.RequireAssertion(context => 
        context.User.HasClaim("role", "ADMIN") || context.User.HasClaim("type", "STUDENT")));
    options.AddPolicy("AdminOrTutor", policy => policy.RequireAssertion(context => 
        context.User.HasClaim("role", "ADMIN") || context.User.HasClaim("type", "TUTOR")));
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("http://localhost:3001", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});



// Dependency Injection
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Company Services
builder.Services.AddScoped<ICompanieRepository, CompanieRepository>();
builder.Services.AddScoped<CreateCompanieUseCase>();
builder.Services.AddScoped<GetAllCompaniesUseCase>();
builder.Services.AddScoped<GetCompanieUseCase>();
builder.Services.AddScoped<UpdateCompanieUseCase>();
builder.Services.AddScoped<DeleteCompanieUseCase>();

// Contact Services
builder.Services.AddScoped<ICompanieContactRepository, CompanieContactRepository>();
builder.Services.AddScoped<CreateCompanieContactUseCase>();
builder.Services.AddScoped<UpdateCompanieContactUseCase>();
builder.Services.AddScoped<DeleteCompanieContactUseCase>();
builder.Services.AddScoped<GetCompanieContactUseCase>();
builder.Services.AddScoped<GetAllCompanieContactsUseCase>();

// Project Services
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<CreateProjectUseCase>();
builder.Services.AddScoped<GetAllProjectsUseCase>();
builder.Services.AddScoped<GetProjectUseCase>();
builder.Services.AddScoped<UpdateProjectUseCase>();
builder.Services.AddScoped<DeleteProjectUseCase>();

// Assignment Services
builder.Services.AddScoped<IProjectAssignmentRepository, ProjectAssignmentRepository>();
builder.Services.AddScoped<CreateProjectAssignmentUseCase>();
builder.Services.AddScoped<GetAllProjectAssignmentsUseCase>();
builder.Services.AddScoped<GetProjectAssignmentUseCase>();
builder.Services.AddScoped<UpdateProjectAssignmentUseCase>();
builder.Services.AddScoped<DeleteProjectAssignmentUseCase>();

// Deliverable Services
builder.Services.AddScoped<IDeliverableRepository, DeliverableRepository>();
builder.Services.AddScoped<CreateDeliverableUseCase>();
builder.Services.AddScoped<GetAllDeliverablesUseCase>();
builder.Services.AddScoped<GetDeliverableUseCase>();
builder.Services.AddScoped<UpdateDeliverableUseCase>();
builder.Services.AddScoped<DeleteDeliverableUseCase>();

// Deliverable Assignment Services
builder.Services.AddScoped<IDeliverableAssignmentRepository, DeliverableAssignmentRepository>();
builder.Services.AddScoped<CreateDeliverableAssignmentUseCase>();
builder.Services.AddScoped<GetAllDeliverableAssignmentsUseCase>();

// Deliverable Submission Services
builder.Services.AddScoped<IDeliverableSubmissionRepository, DeliverableSubmissionRepository>();
builder.Services.AddScoped<CreateDeliverableSubmissionUseCase>();
builder.Services.AddScoped<GradeDeliverableSubmissionUseCase>();

// Company Rating Services
builder.Services.AddScoped<ICompanyRatingRepository, CompanyRatingRepository>();
builder.Services.AddScoped<CreateCompanyRatingUseCase>();
builder.Services.AddScoped<GetAllCompanyRatingsUseCase>();

builder.Services.AddScoped<IMinioService, MinioService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
public partial class Program { }
