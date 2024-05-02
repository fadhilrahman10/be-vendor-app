-- CreateTable
CREATE TABLE "vendors" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,
    "unit" SMALLINT NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);
