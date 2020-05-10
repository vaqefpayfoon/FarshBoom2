using Microsoft.EntityFrameworkCore.Migrations;

namespace FarshBoom.Migrations
{
    public partial class completeSlider : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Passage",
                table: "Slides",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passage",
                table: "Slides");
        }
    }
}
