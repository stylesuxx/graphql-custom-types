import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { Factory } from './factory';
import { GraphQLCustomScalarType } from './types';

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

const stringValidator = function(ast) {
  if (ast.kind !== Kind.STRING) {
    throw new GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
  }
};

const lengthValidator = function(ast, min, max) {
  if(ast.value.length < min) {
    throw new GraphQLError('Query error: String not long enough', [ast]);
  }

  if(max && ast.value.length > max) {
    throw new GraphQLError('Query error: String too long', [ast]);
  }
};

const alphabetValidator = function(ast, alphabet) {
  for(var char of ast.value) {
    if(alphabet.indexOf(char) < 0) {
      throw new GraphQLError('Query error: Invalid character found', [ast]);
    }
  }
};

const complexityValidator = function(ast, options) {
  const complexity = options || {};
  const alhpaNumericRe = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  /*
    alphaNumeric: true,
    mixedCase: true,
    specialChars: true
  */

  // Check alphaNumeric
  if(complexity.alphaNumeric && !alhpaNumericRe.test(ast.value)) {
    throw new GraphQLError('Query error: String must contain at least one number and one letter', [ast]);
  }
  // Check case
  // Check special Chars
};

var limitedStringCounter = 0;
export class GraphQLLimitedString extends GraphQLCustomScalarType {
  constructor(min = 1, max, alphabet) {
    const suffix = (limitedStringCounter++ > 0) ? limitedStringCounter : '';
    const name = 'LimitedString' + suffix;
    var description = 'A limited string.';
    if(max) description += ' Has to be between ' + min + ' and ' + max + ' characters long.';
    else description += ' Has to be at least ' + min + 'characters long.';
    if(alphabet) description += ' May only contain the following characters: ' + alphabet;

    const validator = function(ast) {
      stringValidator(ast);
      lengthValidator(ast, min, max);

      if(alphabet) alphabetValidator(ast, alphabet);

      return ast.value;
    }

    super(name, description, validator);
  }
};

var passwordCounter = 0;
export class GraphQLPassword extends GraphQLCustomScalarType {
  constructor(min = 1, max, alphabet, complexity) {
    const suffix = (passwordCounter++ > 0) ? passwordCounter : '';
    const name = 'Password' + suffix;
    var description = 'A password string.';
    if(max) description += ' Has to be between ' + min + ' and ' + max + ' characters long.';
    else description += ' Has to be at least ' + min + 'characters long.';
    if(alphabet) description += ' May only contain the following characters: ' + alphabet;
    if(complexity) {
      if(complexity.alphaNumeric) description += ' Has to be alpha numeric.';
      if(complexity.mixedCase) description += ' Has to be mixed case.';
      if(complexity.specialChars) description += ' Has to contain special characters';
    }

    const validator = function(ast) {
      stringValidator(ast);
      lengthValidator(ast, min, max);

      if(alphabet) alphabetValidator(ast, alphabet);
      if(complexity) complexityValidator(ast, complexity);

      return ast.value;
    }

    super(name, description, validator);
  }
};
