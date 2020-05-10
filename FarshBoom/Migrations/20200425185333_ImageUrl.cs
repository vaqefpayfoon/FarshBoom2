using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FarshBoom.Migrations
{
    public partial class ImageUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "PageContents");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Goods");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Slides",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Slides");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Slides",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "PageContents",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Goods",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
