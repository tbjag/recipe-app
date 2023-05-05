/*
  Warnings:

  - You are about to drop the `_RecipeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RecipeToUser" DROP CONSTRAINT "_RecipeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecipeToUser" DROP CONSTRAINT "_RecipeToUser_B_fkey";

-- DropTable
DROP TABLE "_RecipeToUser";

-- CreateTable
CREATE TABLE "UsersFavorite" (
    "recipeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "favoritedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersFavorite_pkey" PRIMARY KEY ("recipeId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersFavorite" ADD CONSTRAINT "UsersFavorite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersFavorite" ADD CONSTRAINT "UsersFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
