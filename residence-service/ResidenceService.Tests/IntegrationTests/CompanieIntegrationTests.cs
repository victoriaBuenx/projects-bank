using Microsoft.AspNetCore.Mvc.Testing;
using ResidenceService.Api.Application.dtos.companies;
using ResidenceService.Api.Domain.entities;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace ResidenceService.Tests.IntegrationTests;

public class CompanieIntegrationTests : BaseIntegrationTest
{
    public CompanieIntegrationTests(WebApplicationFactory<Program> factory) : base(factory)
    {
    }

    [Fact]
    public async Task Create_Companie_Returns_Ok()
    {
        var dto = new CreateCompanieDto { nombreEmpresa = "Integration Test Co", rfc = "INT123456" };

        var response = await _client.PostAsJsonAsync("/companies/register", dto);
        var content = await response.Content.ReadAsStringAsync();

        if (response.StatusCode != HttpStatusCode.OK)
        {
             throw new Exception($"Test failed with {response.StatusCode}. Content: {content}");
        }
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var company = await response.Content.ReadFromJsonAsync<Companie>();
        company.nombreEmpresa.Should().Be("Integration Test Co");
    }

    [Fact]
    public async Task GetAll_Companies_Returns_List()
    {
        var dto = new CreateCompanieDto { nombreEmpresa = "List Co", rfc = "LST123" };
        var postRes = await _client.PostAsJsonAsync("/companies/register", dto);
        postRes.StatusCode.Should().Be(HttpStatusCode.OK);

        var response = await _client.GetAsync("/companies");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var companies = await response.Content.ReadFromJsonAsync<List<Companie>>();
        companies.Should().NotBeEmpty();
    }

    [Fact]
    public async Task GetById_Returns_NotFound_For_Missing_Id()
    {
        var response = await _client.GetAsync($"/companies/{Guid.NewGuid()}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}
