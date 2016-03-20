import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLDateTime,
  GraphQLUUID
} from '../lib';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      email: {
        type: GraphQLString,
        args: {
          item: { type: GraphQLEmail }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      url: {
        type: GraphQLString,
        args: {
          item: { type: GraphQLURL }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      limitedStringDefault: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLLimitedString() }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      limitedStringMinMax: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLLimitedString(3, 10) }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      limitedStringAlphabet: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLLimitedString(3, 10, 'abc123') }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      password: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLPassword(null, null, null, { alphaNumeric: true }) }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      passwordMixedCase: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLPassword(null, null, null, { mixedCase: true }) }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      passwordSpecialChars: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLPassword(null, null, null, { specialChars: true }) }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      passwordAll: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLPassword(3, 6, 'abcABC123!"§', { specialChars: true, mixedCase: true, alphaNumeric: true }) }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      date: {
        type: GraphQLString,
        args: {
          item: { type: GraphQLDateTime }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      uuid: {
        type: GraphQLString,
        args: {
          item: { type: GraphQLUUID }
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
    }
  })
});
