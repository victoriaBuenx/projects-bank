using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ResidenceService.Api.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class GuidRefactorFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM \"CompanyRating\";");
            migrationBuilder.Sql("DELETE FROM \"ProjectAssignment\";");
            migrationBuilder.Sql("DELETE FROM \"Project\";");
            migrationBuilder.Sql("DELETE FROM \"CompanieContact\";");
            migrationBuilder.Sql("DELETE FROM \"Companies\";");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanieContact_Companies_Companieid",
                table: "CompanieContact");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRating_Companies_Companieid",
                table: "CompanyRating");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRating_ProjectAssignment_ProjectAssignmentId",
                table: "CompanyRating");

            migrationBuilder.DropForeignKey(
                name: "FK_Project_Companies_Companieid",
                table: "Project");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAssignment_Project_Projectid",
                table: "ProjectAssignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectAssignment",
                table: "ProjectAssignment");

            migrationBuilder.DropIndex(
                name: "IX_ProjectAssignment_Projectid",
                table: "ProjectAssignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Project",
                table: "Project");

            migrationBuilder.DropIndex(
                name: "IX_Project_Companieid",
                table: "Project");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyRating",
                table: "CompanyRating");

            migrationBuilder.DropIndex(
                name: "IX_CompanyRating_Companieid",
                table: "CompanyRating");

            migrationBuilder.DropIndex(
                name: "IX_CompanyRating_ProjectAssignmentId",
                table: "CompanyRating");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanieContact",
                table: "CompanieContact");

            migrationBuilder.DropIndex(
                name: "IX_CompanieContact_Companieid",
                table: "CompanieContact");

            migrationBuilder.DropColumn(
                name: "Projectid",
                table: "ProjectAssignment");

            migrationBuilder.DropColumn(
                name: "Companieid",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Companieid",
                table: "CompanyRating");

            migrationBuilder.DropColumn(
                name: "ProjectAssignmentId",
                table: "CompanyRating");

            migrationBuilder.DropColumn(
                name: "Companieid",
                table: "CompanieContact");

            migrationBuilder.RenameTable(
                name: "ProjectAssignment",
                newName: "ProjectAssignments");

            migrationBuilder.RenameTable(
                name: "Project",
                newName: "Projects");

            migrationBuilder.RenameTable(
                name: "CompanyRating",
                newName: "CompanyRatings");

            migrationBuilder.RenameTable(
                name: "CompanieContact",
                newName: "CompanieContacts");

            migrationBuilder.Sql("ALTER TABLE \"Companies\" ALTER COLUMN id DROP IDENTITY IF EXISTS;");
            migrationBuilder.Sql("ALTER TABLE \"CompanieContacts\" ALTER COLUMN id DROP IDENTITY IF EXISTS;");
            migrationBuilder.Sql("ALTER TABLE \"Projects\" ALTER COLUMN id DROP IDENTITY IF EXISTS;");
            migrationBuilder.Sql("ALTER TABLE \"ProjectAssignments\" ALTER COLUMN \"Id\" DROP IDENTITY IF EXISTS;");
            migrationBuilder.Sql("ALTER TABLE \"CompanyRatings\" ALTER COLUMN \"Id\" DROP IDENTITY IF EXISTS;");

            migrationBuilder.DropColumn(
                name: "id",
                table: "Companies");

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                table: "Companies",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "IdTutor",
                table: "ProjectAssignments");

            migrationBuilder.AddColumn<Guid>(
                name: "IdTutor",
                table: "ProjectAssignments",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "IdProject",
                table: "ProjectAssignments");

            migrationBuilder.AddColumn<Guid>(
                name: "IdProject",
                table: "ProjectAssignments",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "IdEstudiante",
                table: "ProjectAssignments");

            migrationBuilder.AddColumn<Guid>(
                name: "IdEstudiante",
                table: "ProjectAssignments",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProjectAssignments");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ProjectAssignments",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "idCompanie",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "idCompanie",
                table: "Projects",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "id",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                table: "Projects",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "IdProjectAssignment",
                table: "CompanyRatings");

            migrationBuilder.AddColumn<Guid>(
                name: "IdProjectAssignment",
                table: "CompanyRatings",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "IdEstudiante",
                table: "CompanyRatings");

            migrationBuilder.AddColumn<Guid>(
                name: "IdEstudiante",
                table: "CompanyRatings",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "IdCompanie",
                table: "CompanyRatings");

            migrationBuilder.AddColumn<Guid>(
                name: "IdCompanie",
                table: "CompanyRatings",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CompanyRatings");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CompanyRatings",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "idCompanie",
                table: "CompanieContacts");

            migrationBuilder.AddColumn<Guid>(
                name: "idCompanie",
                table: "CompanieContacts",
                type: "uuid",
                nullable: false);

            migrationBuilder.DropColumn(
                name: "id",
                table: "CompanieContacts");

            migrationBuilder.AddColumn<Guid>(
                name: "id",
                table: "CompanieContacts",
                type: "uuid",
                nullable: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectAssignments",
                table: "ProjectAssignments",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Projects",
                table: "Projects",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyRatings",
                table: "CompanyRatings",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanieContacts",
                table: "CompanieContacts",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "id");

            migrationBuilder.CreateTable(
                name: "Deliverables",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false),
                    Descripcion = table.Column<string>(type: "text", nullable: false),
                    FechaLimite = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FormatoMuestra = table.Column<string>(type: "text", nullable: false),
                    Comentarios = table.Column<string>(type: "text", nullable: false),
                    Activo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliverables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeliverableAssignments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdDeliverable = table.Column<Guid>(type: "uuid", nullable: false),
                    IdProjectAssignment = table.Column<Guid>(type: "uuid", nullable: false),
                    FechaAsignacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
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
                        name: "FK_DeliverableAssignments_ProjectAssignments_IdProjectAssignme~",
                        column: x => x.IdProjectAssignment,
                        principalTable: "ProjectAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliverableSubmissions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IdDeliverableAssignment = table.Column<Guid>(type: "uuid", nullable: false),
                    ArchivoUrl = table.Column<string>(type: "text", nullable: false),
                    FechaEnvio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Calificacion = table.Column<int>(type: "integer", nullable: true),
                    ComentarioTutor = table.Column<string>(type: "text", nullable: true),
                    FechaCalificacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Estado = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliverableSubmissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliverableSubmissions_DeliverableAssignments_IdDeliverable~",
                        column: x => x.IdDeliverableAssignment,
                        principalTable: "DeliverableAssignments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectAssignments_IdProject",
                table: "ProjectAssignments",
                column: "IdProject");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_idCompanie",
                table: "Projects",
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
                name: "IX_CompanieContacts_idCompanie",
                table: "CompanieContacts",
                column: "idCompanie");

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

            migrationBuilder.AddForeignKey(
                name: "FK_CompanieContacts_Companies_idCompanie",
                table: "CompanieContacts",
                column: "idCompanie",
                principalTable: "Companies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRatings_Companies_IdCompanie",
                table: "CompanyRatings",
                column: "IdCompanie",
                principalTable: "Companies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRatings_ProjectAssignments_IdProjectAssignment",
                table: "CompanyRatings",
                column: "IdProjectAssignment",
                principalTable: "ProjectAssignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAssignments_Projects_IdProject",
                table: "ProjectAssignments",
                column: "IdProject",
                principalTable: "Projects",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Companies_idCompanie",
                table: "Projects",
                column: "idCompanie",
                principalTable: "Companies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanieContacts_Companies_idCompanie",
                table: "CompanieContacts");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRatings_Companies_IdCompanie",
                table: "CompanyRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_CompanyRatings_ProjectAssignments_IdProjectAssignment",
                table: "CompanyRatings");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAssignments_Projects_IdProject",
                table: "ProjectAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Companies_idCompanie",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "DeliverableSubmissions");

            migrationBuilder.DropTable(
                name: "DeliverableAssignments");

            migrationBuilder.DropTable(
                name: "Deliverables");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Projects",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_idCompanie",
                table: "Projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectAssignments",
                table: "ProjectAssignments");

            migrationBuilder.DropIndex(
                name: "IX_ProjectAssignments_IdProject",
                table: "ProjectAssignments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyRatings",
                table: "CompanyRatings");

            migrationBuilder.DropIndex(
                name: "IX_CompanyRatings_IdCompanie",
                table: "CompanyRatings");

            migrationBuilder.DropIndex(
                name: "IX_CompanyRatings_IdProjectAssignment",
                table: "CompanyRatings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanieContacts",
                table: "CompanieContacts");

            migrationBuilder.DropIndex(
                name: "IX_CompanieContacts_idCompanie",
                table: "CompanieContacts");

            migrationBuilder.RenameTable(
                name: "Projects",
                newName: "Project");

            migrationBuilder.RenameTable(
                name: "ProjectAssignments",
                newName: "ProjectAssignment");

            migrationBuilder.RenameTable(
                name: "CompanyRatings",
                newName: "CompanyRating");

            migrationBuilder.RenameTable(
                name: "CompanieContacts",
                newName: "CompanieContact");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "Companies",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "idCompanie",
                table: "Project",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "Project",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Companieid",
                table: "Project",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "IdTutor",
                table: "ProjectAssignment",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "IdProject",
                table: "ProjectAssignment",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "IdEstudiante",
                table: "ProjectAssignment",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ProjectAssignment",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Projectid",
                table: "ProjectAssignment",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "IdProjectAssignment",
                table: "CompanyRating",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "IdEstudiante",
                table: "CompanyRating",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "IdCompanie",
                table: "CompanyRating",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "CompanyRating",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Companieid",
                table: "CompanyRating",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProjectAssignmentId",
                table: "CompanyRating",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "idCompanie",
                table: "CompanieContact",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "CompanieContact",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "Companieid",
                table: "CompanieContact",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Project",
                table: "Project",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectAssignment",
                table: "ProjectAssignment",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyRating",
                table: "CompanyRating",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanieContact",
                table: "CompanieContact",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_Project_Companieid",
                table: "Project",
                column: "Companieid");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectAssignment_Projectid",
                table: "ProjectAssignment",
                column: "Projectid");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRating_Companieid",
                table: "CompanyRating",
                column: "Companieid");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyRating_ProjectAssignmentId",
                table: "CompanyRating",
                column: "ProjectAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanieContact_Companieid",
                table: "CompanieContact",
                column: "Companieid");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanieContact_Companies_Companieid",
                table: "CompanieContact",
                column: "Companieid",
                principalTable: "Companies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRating_Companies_Companieid",
                table: "CompanyRating",
                column: "Companieid",
                principalTable: "Companies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyRating_ProjectAssignment_ProjectAssignmentId",
                table: "CompanyRating",
                column: "ProjectAssignmentId",
                principalTable: "ProjectAssignment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Project_Companies_Companieid",
                table: "Project",
                column: "Companieid",
                principalTable: "Companies",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAssignment_Project_Projectid",
                table: "ProjectAssignment",
                column: "Projectid",
                principalTable: "Project",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
