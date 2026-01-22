-- CreateEnum
CREATE TYPE "TimeReportStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "TimeReport" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "contractId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "status" "TimeReportStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TimeReport_employeeId_date_idx" ON "TimeReport"("employeeId", "date");

-- CreateIndex
CREATE INDEX "TimeReport_contractId_idx" ON "TimeReport"("contractId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeReport_employeeId_date_contractId_key" ON "TimeReport"("employeeId", "date", "contractId");

-- AddForeignKey
ALTER TABLE "TimeReport" ADD CONSTRAINT "TimeReport_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeReport" ADD CONSTRAINT "TimeReport_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;
