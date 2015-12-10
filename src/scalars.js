import {
  GraphQLString,
  GraphQLScalarType
} from 'graphql';

import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

const regexFactory = function(options) {
  const error = options.error || 'Query error: ' + options.name;
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

export const GraphQLURL = regexFactory({
    name: 'URL',
    // RegExp taken from https://gist.github.com/dperini/729294
    regex: new RegExp('^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i'),
    description:'The URL scalar type represents URL addresses.',
    error: 'Query error: Not a valid URL'
});

export class GraphQLLimitedString extends GraphQLScalarType {
  constructor(min = 1, max, alphabet) {
    var description = 'A limited string.';
    if(max) description += ' Has to be between ' + min + ' and ' + max + ' characters long.';
    else description += ' Has to be at least ' + min + 'characters long.';
    if(alphabet) description += ' May only contain the following characters: ' + alphabet;

    super({
      name: 'LimitedString',
      description: description,
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

        if(ast.value.length < min) {
          throw new GraphQLError('Query error: String not long enough', [ast]);
        }

        if(max && ast.value.length > max) {
          throw new GraphQLError('Query error: String too long', [ast]);
        }

        // check for valid characters

        return ast.value;
      }
    });
  }
};
