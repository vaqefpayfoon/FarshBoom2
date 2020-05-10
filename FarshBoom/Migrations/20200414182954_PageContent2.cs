using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FarshBoom.Migrations
{
    public partial class PageContent2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddedDate",
                table: "PageContents",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "PageContents",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "PageContents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedDate",
                table: "PageContents");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "PageContents");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "PageContents");
        }
    }
}
