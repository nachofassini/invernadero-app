import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql",
  documents: "graphql/operations/*.graphql",
  ignoreNoDocuments: true,
  hooks: { afterOneFileWrite: ["prettier --write"] },
  generates: {
    "gql/index.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
