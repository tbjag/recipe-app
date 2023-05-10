import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';
import { schema } from './src/schema';

const config: CodegenConfig = {
  schema: printSchema(schema),
  // documents: ['src/**/*.tsx', 
  // './src/**/*.ts', 
  // './src/schema/**/*.ts',
  // '/src/schema/Cuisine.ts',
  // '/src/schema/Ingredient.ts',
  // '/src/schema/Recipe.ts',
  // '/src/schema/User.ts',
  // '/src/schema/UsersFavorite.ts',
  // '/src/schema.ts',
  // ],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
  config: {
    scalars: {
      DateTime: 'Date'
    }
  }
};

export default config;