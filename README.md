# GraphQL Custom Types
[![npm version](https://badge.fury.io/js/graphql-custom-types.svg)](https://badge.fury.io/js/graphql-custom-types) [![Build Status](https://secure.travis-ci.org/stylesuxx/graphql-custom-types.png?branch=master)](https://travis-ci.org/stylesuxx/graphql-custom-types) [![Dependency Status](https://david-dm.org/stylesuxx/graphql-custom-types.svg)](https://david-dm.org/stylesuxx/graphql-custom-types) [![devDependencies Status](https://david-dm.org/stylesuxx/graphql-custom-types/dev-status.svg)](https://david-dm.org/stylesuxx/graphql-custom-types?type=dev) [![peerDependencies Status](https://david-dm.org/stylesuxx/graphql-custom-types/peer-status.svg)](https://david-dm.org/stylesuxx/graphql-custom-types?type=peer)

> This is a collection of custom GraphQL types that I tend to reuse quite often so I packed them into a module.

## Available Types
Let me give you an overview of the available types. If you need more detail about how to use them, check *schema.js* in the tests folder.

### Scalar
The primitive types, aka everything that may be represented as a string. The ones with parameters you need to instantiate with *new* and pass according parameters, the others may be used as are.

* GraphQLEmail
* GraphQLURL
* GraphQLDateTime
* GraphQLLimitedString(min, max, alphabet)
* GraphQLPassword(min, max, alphabet, complexity)
* GraphQLUUID

*complexity* default options:
```JavaScript
{
  alphaNumeric: false,
  mixedCase: false,
  specialChars: false
}
```

## Installation
Most likely you already will have it, but do not forget to also install *graphql*, since it is required as peer dependency:
```Bash
npm install graphql graphql-custom-types --save
```

## Usage
```JavaScript
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLUUID
} from 'graphql-custom-types';
```

And use it in your Schema as you would use any other type.

## Development
Contributions are very welcome, please feel free to submit a type. If you do so make sure there are test cases in place.

### Testing
The test suite may be invoked by running:
```Bash
npm run test
```
