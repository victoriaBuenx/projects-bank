using Microsoft.EntityFrameworkCore;
using ResidenceService.Api.Domain.entities;

namespace ResidenceService.Api.Infrastructure.database.context;

public class AppDbContext : DbContext{
  public AppDbContext (DbContextOptions<AppDbContext> options) : base (options){}

  public DbSet<Companie> Companies {get; set;}
  public DbSet<CompanieContact> CompanieContacts {get; set;}
  public DbSet<CompanyRating> CompanyRatings {get; set;}
  public DbSet<Project> Projects {get; set;}
  public DbSet<ProjectAssignment> ProjectAssignments {get; set;}
  public DbSet<Deliverable> Deliverables {get; set;}
  public DbSet<DeliverableAssignment> DeliverableAssignments {get; set;}
  public DbSet<DeliverableSubmission> DeliverableSubmissions {get; set;}

  protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
} 