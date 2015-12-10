import {
  GraphQLString,
  GraphQLScalarType
} from 'graphql';

import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

const regexFactory = function(options) {
  const error = error || 'Error with GraphQLScalarType' + options.name;
  return new GraphQLScalarType({
    name: options.name,
    description: options.description,
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

      var re = options.regex;
      if(!re.test(ast.value)) {
        throw new GraphQLError(error, [ast]);
      }

      return ast.value;
    }
  });
}

export const GraphQLEmail = regexFactory({
  name: 'Email',
  regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  description:'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  error: 'Query error: Not a valid Email address'
});

export const GraphQLEmail_ = new GraphQLScalarType({
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
