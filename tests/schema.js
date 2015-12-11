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
  GraphQLPassword
} from '../lib/scalars';

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
          item: { type: new GraphQLPassword(null, null, null, { alphaNumeric: true })}
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
      passwordMixedCase: {
        type: GraphQLString,
        args: {
          item: { type: new GraphQLPassword(null, null, null, { mixedCase: true })}
        },
        resolve: (root, {item}) => {
          return item;
        }
      },
    }
  })
});
