-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RecyclingPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_RecyclingPoint" ("address", "description", "id", "latitude", "longitude", "name") SELECT "address", "description", "id", "latitude", "longitude", "name" FROM "RecyclingPoint";
DROP TABLE "RecyclingPoint";
ALTER TABLE "new_RecyclingPoint" RENAME TO "RecyclingPoint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
