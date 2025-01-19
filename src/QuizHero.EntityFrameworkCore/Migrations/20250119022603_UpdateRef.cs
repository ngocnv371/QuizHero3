using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizHero.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRef : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionResults_Questions_QuestionId",
                schema: "Quiz",
                table: "QuestionResults");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizResults_Quizzes_QuizId",
                schema: "Quiz",
                table: "QuizResults");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionResults_Questions_QuestionId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "QuestionId",
                principalSchema: "Quiz",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizResults_Quizzes_QuizId",
                schema: "Quiz",
                table: "QuizResults",
                column: "QuizId",
                principalSchema: "Quiz",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionResults_Questions_QuestionId",
                schema: "Quiz",
                table: "QuestionResults");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizResults_Quizzes_QuizId",
                schema: "Quiz",
                table: "QuizResults");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionResults_Questions_QuestionId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "QuestionId",
                principalSchema: "Quiz",
                principalTable: "Questions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizResults_Quizzes_QuizId",
                schema: "Quiz",
                table: "QuizResults",
                column: "QuizId",
                principalSchema: "Quiz",
                principalTable: "Quizzes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
