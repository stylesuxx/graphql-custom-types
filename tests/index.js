import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString
} from '../lib/scalars';
import test from 'tape';

const schema = new GraphQLSchema({
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

  for(var item of invalid) {
    (function(item) {
      var query = '{email(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.errors) {
          t.equal(result.errors[0].message, 'Query error: Not a valid Email address', 'invalid address recognized');
        }
        else {
          t.fail('invalid address recognized as valid: ' + item);
        }
      });
    })(item);
  }

  for(var item of valid) {
    (function(item) {
      var query = '{email(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.data && result.data.email) {
          t.equal(result.data.email, item, 'valid address recognized');
        }
        else {
          t.fail('valid address recognized as invalid: ' + item);
        }
      });
    })(item);
  }
});

test('GraphQLURL', function(t) {
  const valid = [
    'http://foo.com/blah_blah',
    'http://foo.com/blah_blah/',
    'http://foo.com/blah_blah_(wikipedia)',
    'http://foo.com/blah_blah_(wikipedia)_(again)',
    'http://www.example.com/wpstyle/?p=364',
    'https://www.example.com/foo/?bar=baz&inga=42&quux',
    'http://✪df.ws/123',
    'http://userid:password@example.com:8080',
    'http://userid:password@example.com:8080/',
    'http://userid@example.com',
    'http://userid@example.com/',
    'http://userid@example.com:8080',
    'http://userid@example.com:8080/',
    'http://userid:password@example.com',
    'http://userid:password@example.com/',
    'http://142.42.1.1/',
    'http://142.42.1.1:8080/',
    'http://➡.ws/䨹',
    'http://⌘.ws',
    'http://⌘.ws/',
    'http://foo.com/blah_(wikipedia)#cite-1',
    'http://foo.com/blah_(wikipedia)_blah#cite-1',
    'http://foo.com/unicode_(✪)_in_parens',
    'http://foo.com/(something)?after=parens',
    'http://☺.damowmow.com/',
    'http://code.google.com/events/#&product=browser',
    'http://j.mp',
    'ftp://foo.bar/baz',
    'http://foo.bar/?q=Test%20URL-encoded%20stuff',
    'http://مثال.إختبار',
    'http://例子.测试',
    'http://उदाहरण.परीक्षा',
    'http://-.~_!$&\'()*+,;=:%40:80%2f::::::@example.com',
    'http://1337.net',
    'http://a.b-c.de',
    'http://223.255.255.254'
  ];

  const invalid = [
    'http://',
    'http://.',
    'http://..',
    'http://../',
    'http://?',
    'http://??',
    'http://??/',
    'http://#',
    'http://##',
    'http://##/',
    'http://foo.bar?q=Spaces should be encoded',
    '//',
    '//a',
    '///a',
    '///',
    'http:///a',
    'foo.com',
    'rdar://1234',
    'h://test',
    'http:// shouldfail.com',
    ':// should fail',
    'http://foo.bar/foo(bar)baz quux',
    'ftps://foo.bar/',
    'http://-error-.invalid/',
    'http://-a.b.co',
    'http://a.b-.co',
    'http://0.0.0.0',
    'http://10.1.1.0',
    'http://10.1.1.255',
    'http://224.1.1.1',
    'http://1.1.1.1.1',
    'http://123.123.123',
    'http://3628126748',
    'http://.www.foo.bar/',
    'http://.www.foo.bar./',
    'http://10.1.1.1'
  ];

  t.plan(valid.length + invalid.length);

  for(var item of valid) {
    (function(item) {
      var query = '{url(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.data && result.data.url) {
          t.equal(result.data.url, item, 'valid URL recognized');
        }
        else {
          t.fail('valid URL recognized as invalid: ' + item);
        }
      });
    })(item);
  }

  for(var item of invalid) {
    (function(item) {
      var query = '{url(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.errors) {
          t.equal(result.errors[0].message, 'Query error: Not a valid URL', 'invalid URL recognized');
        }
        else {
          t.fail('invalid URL recognized as valid: ' + item);
        }
      });
    })(item);
  }
});

test('GraphQLLimitedString (default)', function(t) {
  var valid = [
    'a',
    'aa',
    'aaa1',
    '1aaa'
  ];

  var invalid = [''];
  t.plan(valid.length + invalid.length);

  for(var item of valid) {
    (function(item) {
      var query = '{limitedStringDefault(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.data && result.data.limitedStringDefault) {
          t.equal(result.data.limitedStringDefault, item, 'valid LimitedString recognized');
        }
        else {
          t.fail('valid LimitedString recognized as invalid: ' + item);
        }
      });
    })(item);
  }

  for(var item of invalid) {
    (function(item) {
      var query = '{limitedStringDefault(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.errors) {
          t.equal(result.errors[0].message, 'Query error: String not long enough', 'invalid LimitedString recognized');
        }
        else {
          t.fail('invalid LimitedString recognized as valid: ' + item);
        }
      });
    })(item);
  }
});

test('GraphQLLimitedString (min = 3, max = 10)', function(t) {
  var valid = [
    'foo',
    'foobar',
    'foo-bar',
    'foobar23',
    '123456789'
  ];

  var invalid = [
    '',
    'a',
    'aa',
    '01234567890',
    'foobar23456'
  ];

  t.plan(valid.length + invalid.length);

  for(var item of valid) {
    (function(item) {
      var query = '{limitedStringMinMax(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.data && result.data.limitedStringMinMax) {
          t.equal(result.data.limitedStringMinMax, item, 'valid LimitedString recognized');
        }
        else {
          t.fail('valid LimitedString recognized as invalid: ' + item);
        }
      });
    })(item);
  }

  for(var item of invalid) {
    (function(item) {
      var query = '{limitedStringMinMax(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.errors) {
          t.ok(result.errors[0].message, 'invalid LimitedString recognized');
        }
        else {
          t.fail('invalid LimitedString recognized as valid: ' + item);
        }
      });
    })(item);
  }
});

test('GraphQLLimitedString (min = 3, max = 10, alphabet = "abc123")', function(t) {
  var valid = [
    'aaa',
    'abc',
    'abc123',
    '1231231231',
    'aaaaabbbbb',
    '33333ccc22'
  ];

  var invalid = [
    '',
    'a',
    'aa',
    '01234567890',
    'foobar23456'
  ];

  t.plan(valid.length + invalid.length);

  for(var item of valid) {
    (function(item) {
      var query = '{limitedStringAlphabet(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.data && result.data.limitedStringAlphabet) {
          t.equal(result.data.limitedStringAlphabet, item, 'valid LimitedString recognized');
        }
        else {
          t.fail('valid LimitedString recognized as invalid: ' + item);
        }
      });
    })(item);
  }

  for(var item of invalid) {
    (function(item) {
      var query = '{limitedStringAlphabet(item: "' + item + '")}';
      graphql(schema, query).then(function(result) {
        if(result.errors) {
          t.ok(result.errors[0].message, 'invalid LimitedString recognized');
        }
        else {
          t.fail('invalid LimitedString recognized as valid: ' + item);
        }
      });
    })(item);
  }
});
