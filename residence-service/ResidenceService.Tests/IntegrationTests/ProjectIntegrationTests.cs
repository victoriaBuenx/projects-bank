using Microsoft.AspNetCore.Mvc.Testing;
using ResidenceService.Api.Application.dtos.projects;
using ResidenceService.Api.Domain.entities;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace ResidenceService.Tests.IntegrationTests;

public class ProjectIntegrationTests : BaseIntegrationTest
{
    public ProjectIntegrationTests(WebApplicationFactory<Program> factory) : base(factory)
    {
    }

    [Fact]
    public async Task Create_Project_Returns_Ok()
    {
        var dto = new CreateProjectDto 
        { 
            nombreProyecto = "Integration Project", 
            descripcion = "Desc",
            idCompanie = Guid.NewGuid(),
            numeroEstudiantes = 5
        };

        var response = await _client.PostAsJsonAsync("/projects/register", dto);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var project = await response.Content.ReadFromJsonAsync<Project>();
        project.nombreProyecto.Should().Be("Integration Project");
    }

    [Fact]
    public async Task GetAll_Projects_Returns_List()
    {
        var response = await _client.GetAsync("/projects");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var projects = await response.Content.ReadFromJsonAsync<List<Project>>();
        projects.Should().NotBeNull();
    }
}
