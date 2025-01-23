using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizHero.Migrations
{
    /// <inheritdoc />
    public partial class Created_Quiz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Quiz");

            migrationBuilder.CreateTable(
                name: "Topics",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CoverUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Topics_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Topics_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Quizzes",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizzes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Quizzes_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Quizzes_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Quizzes_Topics_TopicId",
                        column: x => x.TopicId,
                        principalSchema: "Quiz",
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTopics",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TopicId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTopics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTopics_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserTopics_Topics_TopicId",
                        column: x => x.TopicId,
                        principalSchema: "Quiz",
                        principalTable: "Topics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuizId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Questions_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Questions_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalSchema: "Quiz",
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizResults",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    QuizId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizResults_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuizResults_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalSchema: "Quiz",
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalSchema: "Quiz",
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionResults",
                schema: "Quiz",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuizResultId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionResults_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_QuestionResults_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalSchema: "Quiz",
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_QuestionResults_QuizResults_QuizResultId",
                        column: x => x.QuizResultId,
                        principalSchema: "Quiz",
                        principalTable: "QuizResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                schema: "Quiz",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionResults_CreatorId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionResults_QuestionId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionResults_QuizResultId",
                schema: "Quiz",
                table: "QuestionResults",
                column: "QuizResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CreatorId",
                schema: "Quiz",
                table: "Questions",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_LastModifierId",
                schema: "Quiz",
                table: "Questions",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizId",
                schema: "Quiz",
                table: "Questions",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_CreatorId",
                schema: "Quiz",
                table: "QuizResults",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_QuizId",
                schema: "Quiz",
                table: "QuizResults",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_CreatorId",
                schema: "Quiz",
                table: "Quizzes",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_LastModifierId",
                schema: "Quiz",
                table: "Quizzes",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_Title",
                schema: "Quiz",
                table: "Quizzes",
                column: "Title");

            migrationBuilder.CreateIndex(
                name: "IX_Quizzes_TopicId",
                schema: "Quiz",
                table: "Quizzes",
                column: "TopicId");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_CreatorId",
                schema: "Quiz",
                table: "Topics",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_LastModifierId",
                schema: "Quiz",
                table: "Topics",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Topics_Name",
                schema: "Quiz",
                table: "Topics",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_UserTopics_CreatorId",
                schema: "Quiz",
                table: "UserTopics",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTopics_TopicId",
                schema: "Quiz",
                table: "UserTopics",
                column: "TopicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers",
                schema: "Quiz");

            migrationBuilder.DropTable(
                name: "QuestionResults",
                schema: "Quiz");

            migrationBuilder.DropTable(
                name: "UserTopics",
                schema: "Quiz");

            migrationBuilder.DropTable(
                name: "Questions",
                schema: "Quiz");

            migrationBuilder.DropTable(
                name: "QuizResults",
                schema: "Quiz");

            migrationBuilder.DropTable(
                name: "Quizzes",
                schema: "Quiz");

            migrationBuilder.DropTable(
                name: "Topics",
                schema: "Quiz");
        }
    }
}
