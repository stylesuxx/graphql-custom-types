import {
  GraphQLString,
  GraphQLScalarType
} from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { GraphQLCustomScalarType } from './types';

export class Factory {
  getRegexScalar(options) {
    const error = options.error || 'Query error: ' + options.name;

    const parser = function(ast) {
      if (ast.kind !== Kind.STRING) {
        throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
      }

      var re = options.regex;
      if(!re.test(ast.value)) {
        throw new GraphQLError(error, [ast]);
      }

      return ast.value;
    };

    return this.getCustomScalar(options.name, options.description, parser);
  }

  getCustomScalar(name, description, parser) {
    return new GraphQLCustomScalarType(name, description, parser);
  }
}
