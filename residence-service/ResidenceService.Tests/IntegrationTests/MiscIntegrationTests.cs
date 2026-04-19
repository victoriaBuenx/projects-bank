using Microsoft.AspNetCore.Mvc.Testing;
using ResidenceService.Api.Application.dtos.deliverables;
using ResidenceService.Api.Application.dtos.companyRatings;
using ResidenceService.Api.Application.dtos.companies;
using ResidenceService.Api.Application.dtos.projects;
using ResidenceService.Api.Application.dtos.projectAssignments;
using ResidenceService.Api.Application.dtos.companyContacts;
using ResidenceService.Api.Domain.entities;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace ResidenceService.Tests.IntegrationTests;

public class MiscIntegrationTests : BaseIntegrationTest
{
    public MiscIntegrationTests(WebApplicationFactory<Program> factory) : base(factory)
    {
    }

    [Fact]
    public async Task Deliverable_Controller_CRUD()
    {
        var dto = new CreateDeliverableDto { Nombre = "Test Deliverable" };
        var postRes = await _client.PostAsJsonAsync("/deliverables", dto);
        postRes.StatusCode.Should().Be(HttpStatusCode.OK);
        var created = await postRes.Content.ReadFromJsonAsync<Deliverable>();

        var getRes = await _client.GetAsync("/deliverables");
        getRes.StatusCode.Should().Be(HttpStatusCode.OK);
        var list = await getRes.Content.ReadFromJsonAsync<List<Deliverable>>();
        list.Should().Contain(d => d.Nombre == "Test Deliverable");
    }

    [Fact]
    public async Task CompanyRating_Controller_Flow()
    {
        var companyDto = new CreateCompanieDto { nombreEmpresa = "Rated Co", rfc = "RAT123" };
        var coRes = await _client.PostAsJsonAsync("/companies/register", companyDto);
        coRes.StatusCode.Should().Be(HttpStatusCode.OK);
        var company = await coRes.Content.ReadFromJsonAsync<Companie>();

        var ratingDto = new CreateCompanyRatingDto 
        { 
            IdCompanie = company!.id, 
            Calificacion = 5, 
            Comentario = "Excellent",
            IdProjectAssignment = Guid.NewGuid()
        };
        var rateRes = await _client.PostAsJsonAsync("/company-ratings", ratingDto);
        rateRes.StatusCode.Should().Be(HttpStatusCode.OK);

        var getRes = await _client.GetAsync($"/company-ratings?companieId={company.id}");
        getRes.StatusCode.Should().Be(HttpStatusCode.OK);
        var ratings = await getRes.Content.ReadFromJsonAsync<List<CompanyRating>>();
        ratings.Should().Contain(r => r.Comentario == "Excellent");
    }

    [Fact]
    public async Task ProjectAssignment_Controller_Flow()
    {
        var coDto = new CreateCompanieDto { nombreEmpresa = "Assign Co", rfc = "ASS123" };
        var coRes = await _client.PostAsJsonAsync("/companies/register", coDto);
        coRes.StatusCode.Should().Be(HttpStatusCode.OK);
        var company = await coRes.Content.ReadFromJsonAsync<Companie>();

        var prDto = new CreateProjectDto 
        { 
            idCompanie = company!.id, 
            nombreProyecto = "Assign Proj",
            descripcion = "Required Description"
        };
        var prRes = await _client.PostAsJsonAsync("/projects/register", prDto);
        prRes.StatusCode.Should().Be(HttpStatusCode.OK);
        var project = await prRes.Content.ReadFromJsonAsync<Project>();

        var assignDto = new CreateProjectAssignmentDto 
        { 
            IdProject = project!.id, 
            IdEstudiante = Guid.NewGuid(),
            IdTutor = Guid.NewGuid()
        };
        var postRes = await _client.PostAsJsonAsync("/project-assignments/register", assignDto);
        postRes.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task CompanieContact_Controller_CRUD()
    {
        var coDto = new CreateCompanieDto { nombreEmpresa = "Contact Co", rfc = "CON123" };
        var coRes = await _client.PostAsJsonAsync("/companies/register", coDto);
        var company = await coRes.Content.ReadFromJsonAsync<Companie>();

        var contactDto = new CreateCompanieContactDto 
        { 
            idCompanie = company!.id, 
            nombre = "John Doe",
            correo = "john@test.com"
        };
        var postRes = await _client.PostAsJsonAsync("/company-contacts/register", contactDto);
        postRes.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task DeliverableSubmission_Controller_Flow()
    {
        var submissionDto = new { idDeliverableAssignment = Guid.NewGuid(), urlArchivo = "http://test.com/file.pdf" };
        var postRes = await _client.PostAsJsonAsync("/deliverable-submissions", submissionDto);
        postRes.StatusCode.Should().NotBe(HttpStatusCode.NotFound);
    }
}
