using Microsoft.EntityFrameworkCore.Migrations;

namespace FarshBoom.Migrations
{
    public partial class cmplModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ColorId2",
                table: "Goods",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Goods_ColorId2",
                table: "Goods",
                column: "ColorId2");

            migrationBuilder.AddForeignKey(
                name: "FK_Goods_Colors_ColorId2",
                table: "Goods",
                column: "ColorId2",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goods_Colors_ColorId2",
                table: "Goods");

            migrationBuilder.DropIndex(
                name: "IX_Goods_ColorId2",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "ColorId2",
                table: "Goods");
        }
    }
}
