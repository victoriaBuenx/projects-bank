using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResidenceService.Api.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    fechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    nombreEmpresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    rfc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cp = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pais = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    estado = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ciudad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    giro = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tamañoEmpresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    convenio = table.Column<bool>(type: "bit", nullable: false),
                    calificacion = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Deliverables",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaLimite = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FormatoMuestra = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comentarios = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Activo = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliverables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CompanieContacts",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    idCompanie = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    apellidoPaterno = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    apellidoMaterno = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    puesto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    correo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    horarioAtencion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    notasAdicionales = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanieContacts", x => x.id);
                    table.ForeignKey(
                        name: "FK_CompanieContacts_Companies_idCompanie",
                        column: x => x.idCompanie,
                        principalTable: "Companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    idCompanie = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombreProyecto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    carreras = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fechaSolicitud = table.Column<DateTime>(type: "datetime2", nullable: false),
                    periodo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    plazosEntrega = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    modalidad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tipoProyecto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    apoyoEconomico = table.Column<bool>(type: "bit", nullable: false),
                    montoApoyo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    numeroEstudiantes = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tecnologias = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.id);
                    table.ForeignKey(
                        name: "FK_Projects_Companies_idCompanie",
                        column: x => x.idCompanie,
                        principalTable: "Companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProject = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdEstudiante = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdTutor = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FechaAsignacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaFinalizacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Estado = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectAssignments_Projects_IdProject",
                        column: x => x.IdProject,
                        principalTable: "Projects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyRatings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdCompanie = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdEstudiante = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProjectAssignment = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Calificacion = table.Column<int>(type: "int", nullable: false),
                    Comentario = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FechaCalificacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyRatings_Companies_IdCompanie",
                        column: x => x.IdCompanie,
                        principalTable: "Companies",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_CompanyRatings_ProjectAssignments_IdProjectAssignment",
                        column: x => x.IdProjectAssignment,
                        principalTable: "ProjectAssignments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DeliverableAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdDeliverable = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdProjectAssignment = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FechaAsignacion = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliverableAssignments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliverableAssignments_Deliverables_IdDeliverable",
                        column: x => x.IdDeliverable,
                        principalTable: "Deliverables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliverableAssignments_ProjectAssignments_IdProjectAssignment",
                        column: x => x.IdProjectAssignment,
                        principalTable: "ProjectAssignments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DeliverableSubmissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdDeliverableAssignment = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ArchivoUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FechaEnvio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Calificacion = table.Column<int>(type: "int", nullable: true),
                    ComentarioTutor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FechaCalificacion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Estado = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliverableSubmissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliverableSubmissions_DeliverableAssignments_IdDeliverableAssignment",
                        column: x => x.IdDeliverableAssignment,
                        principalTable: "DeliverableAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanieContacts_idCompanie",
                table: "CompanieContacts",
                column: "idCompanie");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRatings_IdCompanie",
                table: "CompanyRatings",
                column: "IdCompanie");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRatings_IdProjectAssignment",
                table: "CompanyRatings",
                column: "IdProjectAssignment");

            migrationBuilder.CreateIndex(
                name: "IX_DeliverableAssignments_IdDeliverable",
                table: "DeliverableAssignments",
                column: "IdDeliverable");

            migrationBuilder.CreateIndex(
                name: "IX_DeliverableAssignments_IdProjectAssignment",
                table: "DeliverableAssignments",
                column: "IdProjectAssignment");

            migrationBuilder.CreateIndex(
                name: "IX_DeliverableSubmissions_IdDeliverableAssignment",
                table: "DeliverableSubmissions",
                column: "IdDeliverableAssignment");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectAssignments_IdProject",
                table: "ProjectAssignments",
                column: "IdProject");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_idCompanie",
                table: "Projects",
                column: "idCompanie");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanieContacts");

            migrationBuilder.DropTable(
                name: "CompanyRatings");

            migrationBuilder.DropTable(
                name: "DeliverableSubmissions");

            migrationBuilder.DropTable(
                name: "DeliverableAssignments");

            migrationBuilder.DropTable(
                name: "Deliverables");

            migrationBuilder.DropTable(
                name: "ProjectAssignments");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
