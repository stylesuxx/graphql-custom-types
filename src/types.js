import { GraphQLScalarType } from 'graphql';

export class GraphQLCustomScalarType extends GraphQLScalarType {
  constructor(name, description, parser) {
    super({
      name: name,
      description: description,
      serialize: value => {
        return value;
      },
      parseValue: value => {
        return value;
      },
      parseLiteral: ast => {
        return parser(ast);
      }
    });
  }
}
