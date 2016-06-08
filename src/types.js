import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export class GraphQLCustomScalarType extends GraphQLScalarType {
  constructor(name, description, parser) {
    super({
      name: name,
      description: description,
      serialize: value => {
        return value;
      },
      parseValue: value => {
        const ast = {
          kind: Kind.STRING,
          value: value
        };
        return parser(ast);
      },
      parseLiteral: ast => {
        return parser(ast);
      }
    });
  }
}
