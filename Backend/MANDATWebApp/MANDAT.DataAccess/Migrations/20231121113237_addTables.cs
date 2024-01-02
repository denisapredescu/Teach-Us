using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MANDAT.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Matches_AnnouncementId",
                table: "Matches",
                column: "AnnouncementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_Announcements_AnnouncementId",
                table: "Matches",
                column: "AnnouncementId",
                principalTable: "Announcements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_Announcements_AnnouncementId",
                table: "Matches");

            migrationBuilder.DropIndex(
                name: "IX_Matches_AnnouncementId",
                table: "Matches");
        }
    }
}
