using Microsoft.EntityFrameworkCore.Migrations;

namespace FarshBoom.Migrations
{
    public partial class likeDeploy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Goods_GoodId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_GoodId",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "GoodId",
                table: "Likes");

            migrationBuilder.AddColumn<string>(
                name: "Passage",
                table: "Likes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Srl",
                table: "Likes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Passage",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "Srl",
                table: "Likes");

            migrationBuilder.AddColumn<int>(
                name: "GoodId",
                table: "Likes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Likes_GoodId",
                table: "Likes",
                column: "GoodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Goods_GoodId",
                table: "Likes",
                column: "GoodId",
                principalTable: "Goods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
