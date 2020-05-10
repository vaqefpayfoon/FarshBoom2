using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FarshBoom.Migrations
{
    public partial class PageContent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "PageContents",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "PageContents");
        }
    }
}
