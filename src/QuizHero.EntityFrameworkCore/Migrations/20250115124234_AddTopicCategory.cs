using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizHero.Migrations
{
    /// <inheritdoc />
    public partial class AddTopicCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                schema: "Quiz",
                table: "Topics",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                schema: "Quiz",
                table: "Topics");
        }
    }
}
