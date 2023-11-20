using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MANDAT.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class tablevideo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assessment",
                columns: table => new
                {
                    AssessmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MentorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AssessmentCreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AssessmentDeadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MentorPdf = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    StudentPdf = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    checkStatus = table.Column<bool>(type: "bit", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessment", x => x.AssessmentId);
                    table.ForeignKey(
                        name: "FK_Assessment_Mentors_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Assessment_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Videos",
                columns: table => new
                {
                    MentorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SendDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    YoutubeVideoCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Videos", x => new { x.StudentId, x.MentorId, x.SendDate });
                    table.ForeignKey(
                        name: "FK_Videos_Mentors_MentorId",
                        column: x => x.MentorId,
                        principalTable: "Mentors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Videos_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_MentorId",
                table: "Assessment",
                column: "MentorId");

            migrationBuilder.CreateIndex(
                name: "IX_Assessment_StudentId",
                table: "Assessment",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Videos_MentorId",
                table: "Videos",
                column: "MentorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assessment");

            migrationBuilder.DropTable(
                name: "Videos");
        }
    }
}
