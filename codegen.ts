import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://0.0.0.0:8000/graphql': {
        headers: {
          authorization: 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InV1aWQiOiIxNThjZWEyMS0zMjQ4LTRkMWYtYWRiNi1lNjAwMDBmMGRlMTkiLCJuYW1lIjoiTk9SRElOIEJJTiBaQUhBUkkiLCJlbWFpbCI6InZpcG5vcmRpbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRuUi5RbXNoMjZTby5UeTNxd1RVSXJlbkF3NmVUbEJOQmw4ZS9qc1A1d0dPUXJ4dUptell4NiIsImNyZWF0ZWRBdCI6IjIwMjQtMDYtMjJUMDg6MTY6NTAuOTE5WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDYtMjJUMDg6MTY6NTAuOTE5WiJ9LCJpYXQiOjE3MTk1OTE4NDksImV4cCI6MTcxOTY3ODI0OX0.eTKkxupizyO8uSLrx_qcyBUk0vm6ENmhlSV4JXs3i-4'
        }
      }
    }
  ],
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}

export default config
