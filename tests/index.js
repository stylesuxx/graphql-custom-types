import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { GraphQLEmail } from '../lib/scalars';
import test from 'tape';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      echo: {
        type: GraphQLString,
        args: {
          email: { type: GraphQLEmail }
        },
        resolve: (root, {email}) => {
          return email;
        }
      }
    }
  })
});

test('GraphQLEmail', function(t) {
  const invalid = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@example..com',
    'Abc..123@example.com'
  ];

  const valid = [
    'email@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    '“email”@example.com',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com'
  ];

  t.plan(valid.length + invalid.length);

  for(var mail of invalid) {
    (function(mail) {
      var query = '{echo(email: "' + mail + '")}';
      graphql(schema, query).then(function(result) {
        if(result.errors) {
          console.log(result.errors[0].message);
          t.pass('invalid address recognized');
        }
        else {
          t.fail('invalid address recognized as valid:' + mail);
        }
      });
    })(mail);
  }

  for(var mail of valid) {
    (function(mail) {
      var query = '{echo(email: "' + mail + '")}';
      graphql(schema, query).then(function(result) {
        if(result.data && result.data.echo) {
          t.pass('valid address recognized');
        }
        else {
          t.fail('Did not recognize valid address: ' + mail);
        }
      });
    })(mail);
  }
});
