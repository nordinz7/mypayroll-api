import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://0.0.0.0:8000/graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}

export default config