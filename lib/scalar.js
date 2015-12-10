'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLEmail = undefined;

var _graphql = require('graphql');

var _error = require('graphql/error');

var _language = require('graphql/language');

var GraphQLEmail = exports.GraphQLEmail = new _graphql.GraphQLScalarType({
  name: 'Email',
  description: 'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  serialize: function serialize(value) {
    return value;
  },
  parseValue: function parseValue(value) {
    return value;
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind !== _language.Kind.STRING) {
      throw new _error.GraphQLError('Query error: Can only parse strings got a: ' + ast.kind, [ast]);
    }

    // Regex taken from: http://stackoverflow.com/a/46181/761555
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(ast.value)) {
      throw new _error.GraphQLError('Query error: Not a valid Email address', [ast]);
    }

    return ast.value;
  }
});