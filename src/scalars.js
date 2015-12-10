import {
  GraphQLString,
  GraphQLScalarType
} from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { Factory } from './factory';

const factory = new Factory();

export const GraphQLEmail = factory.getRegexScalar({
  name: 'Email',
  regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  description:'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  error: 'Query error: Not a valid Email address'
});

export const GraphQLURL = factory.getRegexScalar({
    name: 'URL',
    // RegExp taken from https://gist.github.com/dperini/729294
    regex: new RegExp('^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i'),
    description:'The URL scalar type represents URL addresses.',
    error: 'Query error: Not a valid URL'
});

var limitedStringCounter = 0;
export class GraphQLLimitedString extends GraphQLScalarType {
  constructor(min = 1, max, alphabet) {
    var description = 'A limited string.';
    if(max) description += ' Has to be between ' + min + ' and ' + max + ' characters long.';
    else description += ' Has to be at least ' + min + 'characters long.';
    if(alphabet) description += ' May only contain the following characters: ' + alphabet;

    const suffix = (limitedStringCounter++ > 0) ? limitedStringCounter : '';
    super({
      name: 'LimitedString' + suffix,
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

        if(alphabet) {
          for(var char of ast.value) {
            if(alphabet.indexOf(char) < 0) {
              throw new GraphQLError('Query error: Invalid character found', [ast]);
            }
          }
        }

        return ast.value;
      }
    });
  }
};
