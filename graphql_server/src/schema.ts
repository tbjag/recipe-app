import { builder } from "./builder";

import "./schema/User"
import "./schema/Cuisine"
import "./schema/Ingredient"
import "./schema/Recipe"
import "./schema/UsersFavorite"

export const schema = builder.toSchema({})