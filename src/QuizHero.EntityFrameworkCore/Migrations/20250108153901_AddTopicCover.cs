using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizHero.Migrations
{
    /// <inheritdoc />
    public partial class AddTopicCover : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                schema: "Quiz",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                schema: "Quiz",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                schema: "Quiz",
                table: "Quizzes");

            migrationBuilder.RenameColumn(
                name: "ExtraProperties",
                schema: "Quiz",
                table: "Topics",
                newName: "CoverUrl");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                schema: "Quiz",
                table: "Topics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                schema: "Quiz",
                table: "Topics");

            migrationBuilder.RenameColumn(
                name: "CoverUrl",
                schema: "Quiz",
                table: "Topics",
                newName: "ExtraProperties");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                schema: "Quiz",
                table: "Topics",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                schema: "Quiz",
                table: "Quizzes",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                schema: "Quiz",
                table: "Quizzes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
