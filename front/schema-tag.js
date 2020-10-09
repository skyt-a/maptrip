const { printSchema } = require("graphql");
/**
 * スキーマ定義をgraphql-tagで囲んでexportするファイルを出力するだけのプラグイン
 */
module.exports = {
  plugin: (schema) => {
    return `import gql from 'graphql-tag';\nexport const typeDefs = gql\`${printSchema(
      schema
    )}\``;
  },
};