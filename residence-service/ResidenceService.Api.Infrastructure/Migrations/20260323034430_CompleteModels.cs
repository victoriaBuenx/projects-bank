using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ResidenceService.Api.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CompleteModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompanieContact",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idCompanie = table.Column<int>(type: "integer", nullable: false),
                    nombre = table.Column<string>(type: "text", nullable: false),
                    apellidoPaterno = table.Column<string>(type: "text", nullable: false),
                    apellidoMaterno = table.Column<string>(type: "text", nullable: false),
                    puesto = table.Column<string>(type: "text", nullable: false),
                    telefono = table.Column<string>(type: "text", nullable: false),
                    correo = table.Column<string>(type: "text", nullable: false),
                    horarioAtencion = table.Column<string>(type: "text", nullable: false),
                    notasAdicionales = table.Column<string>(type: "text", nullable: false),
                    Companieid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanieContact", x => x.id);
                    table.ForeignKey(
                        name: "FK_CompanieContact_Companies_Companieid",
                        column: x => x.Companieid,
                        principalTable: "Companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    idCompanie = table.Column<int>(type: "integer", nullable: false),
                    nombreProyecto = table.Column<string>(type: "text", nullable: false),
                    descripcion = table.Column<string>(type: "text", nullable: false),
                    carreras = table.Column<string>(type: "text", nullable: false),
                    fechaSolicitud = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    periodo = table.Column<string>(type: "text", nullable: false),
                    plazosEntrega = table.Column<string>(type: "text", nullable: false),
                    modalidad = table.Column<string>(type: "text", nullable: false),
                    tipoProyecto = table.Column<string>(type: "text", nullable: false),
                    apoyoEconomico = table.Column<bool>(type: "boolean", nullable: false),
                    montoApoyo = table.Column<string>(type: "text", nullable: false),
                    numeroEstudiantes = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    tecnologias = table.Column<string>(type: "text", nullable: false),
                    Companieid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.id);
                    table.ForeignKey(
                        name: "FK_Project_Companies_Companieid",
                        column: x => x.Companieid,
                        principalTable: "Companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectAssignment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdProject = table.Column<int>(type: "integer", nullable: false),
                    IdEstudiante = table.Column<int>(type: "integer", nullable: false),
                    IdTutor = table.Column<int>(type: "integer", nullable: false),
                    FechaAsignacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FechaFinalizacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: false),
                    Projectid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectAssignment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectAssignment_Project_Projectid",
                        column: x => x.Projectid,
                        principalTable: "Project",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyRating",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    IdCompanie = table.Column<int>(type: "integer", nullable: false),
                    IdEstudiante = table.Column<int>(type: "integer", nullable: false),
                    IdProjectAssignment = table.Column<int>(type: "integer", nullable: false),
                    Calificacion = table.Column<int>(type: "integer", nullable: false),
                    Comentario = table.Column<string>(type: "text", nullable: true),
                    FechaCalificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Companieid = table.Column<int>(type: "integer", nullable: false),
                    ProjectAssignmentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyRating_Companies_Companieid",
                        column: x => x.Companieid,
                        principalTable: "Companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyRating_ProjectAssignment_ProjectAssignmentId",
                        column: x => x.ProjectAssignmentId,
                        principalTable: "ProjectAssignment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanieContact_Companieid",
                table: "CompanieContact",
                column: "Companieid");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRating_Companieid",
                table: "CompanyRating",
                column: "Companieid");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRating_ProjectAssignmentId",
                table: "CompanyRating",
                column: "ProjectAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_Companieid",
                table: "Project",
                column: "Companieid");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectAssignment_Projectid",
                table: "ProjectAssignment",
                column: "Projectid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanieContact");

            migrationBuilder.DropTable(
                name: "CompanyRating");

            migrationBuilder.DropTable(
                name: "ProjectAssignment");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
