import { PrismaClient } from "@prisma/client";
import { cuisines } from "./exampleCuisine";
import { recipes } from "./exampleRecipes";
import { users } from "./exampleUsers";

const prisma = new PrismaClient();

async function main() {
  // delete everything in the database TODO command for deleting everything within schema
  await prisma.recipe.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cuisine.deleteMany();
  await prisma.ingredient.deleteMany();

  await prisma.cuisine.createMany({
    data: cuisines,
  });

  await prisma.user.createMany({
    data: users, //TODO find interface or something for enum type
  });

  // link recipes to users and cuisines ... 1-1 ration of users to recipes for now
  const usersIds = await prisma.user.findMany({ select: { id: true } });
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    const cuisineId = await prisma.cuisine.findUnique({
      where: {
        name: recipe.cuisine,
      },
      select: { id: true },
    });
    await prisma.recipe.create({
      data: {
        title: recipe.title,
        course: recipe.course,
        cuisineId: cuisineId?.id,
        authorId: usersIds[i].id,
        steps: recipe.steps,
        ingredients: {
          create: recipe.ingredients,
        },
      },
      include: {
        ingredients: true,
      },
    });
  }

  //const cuisinesI = await prisma.cuisine.findMany();
  //const recipesI = await prisma.recipe.findMany({include: {ingredients : true}});
  //const usersI = await prisma.user.findMany({include: {writtenRecipe: true}});

  //console.dir(usersI, { depth: null });
  //console.log(usersI);
  //console.log(cuisinesI);
  console.log("seeded");
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
