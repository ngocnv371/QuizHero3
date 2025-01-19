using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizHero.Migrations
{
    /// <inheritdoc />
    public partial class UpdateQuestionResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionResults_Answers_AnswerId",
                schema: "Quiz",
                table: "QuestionResults");

            migrationBuilder.DropIndex(
                name: "IX_QuestionResults_AnswerId",
                schema: "Quiz",
                table: "QuestionResults");

            migrationBuilder.DropColumn(
                name: "AnswerId",
                schema: "Quiz",
                table: "QuestionResults");

            migrationBuilder.AddColumn<bool>(
                name: "IsCorrect",
                schema: "Quiz",
                table: "QuestionResults",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCorrect",
                schema: "Quiz",
                table: "QuestionResults");

            migrationBuilder.AddColumn<Guid>(
                name: "AnswerId",
                schema: "Quiz",
                table: "QuestionResults",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_QuestionResults_AnswerId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionResults_Answers_AnswerId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "AnswerId",
                principalSchema: "Quiz",
                principalTable: "Answers",
                principalColumn: "Id");
        }
    }
}
