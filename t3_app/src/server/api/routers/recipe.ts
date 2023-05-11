import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';

export const recipeRouter = createTRPCRouter({
    createRecipe: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                cuisine: z.string(),
                course: z.string(),
                ingredients: z.array(z.string()),
                instructions: z.array(z.string()),
            })
        )
        .mutation(
            async ({
                input: { title, cuisine, course, ingredients, instructions },
                ctx,
            }) => {
                const ingredientObject = ingredients.map((e) => {
                    return { name: e, amount: 0, unitType: '', unit: '' };
                });
                return await ctx.prisma.recipe.create({
                    data: {
                        title: title,
                        course: course,
                        cuisineId: cuisine,
                        authorId: ctx.session.user.id,
                        steps: instructions,
                        ingredients: {
                            create: ingredientObject,
                        },
                    },
                    include: {
                        ingredients: true,
                    },
                });
            }
        ),
});
