import {
  GraphQLString,
  GraphQLScalarType
} from 'graphql';

import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

export const GraphQLEmail = new GraphQLScalarType({
  name: 'Email',
  description:'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  serialize: value => {
    return value;
  },
  parseValue: value => {
    return value;
  },
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
    }

    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email address', [ast]);
    }

    return ast.value;
  }
});
