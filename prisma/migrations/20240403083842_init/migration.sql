-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookTitle" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "publishedYear" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
