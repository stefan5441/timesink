-- CreateEnum
CREATE TYPE "public"."Color" AS ENUM ('RED', 'ORANGE', 'AMBER', 'YELLOW', 'LIME', 'GREEN', 'EMERALD', 'TEAL', 'CYAN', 'SKY', 'BLUE', 'INDIGO', 'VIOLET', 'PURPLE', 'FUCHSIA', 'PINK', 'ROSE');

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" "public"."Color" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActivityRecord" (
    "id" TEXT NOT NULL,
    "lengthInSeconds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "activityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ActivityRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "public"."Activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_userId_name_key" ON "public"."Activity"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityRecord_id_key" ON "public"."ActivityRecord"("id");

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityRecord" ADD CONSTRAINT "ActivityRecord_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActivityRecord" ADD CONSTRAINT "ActivityRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
