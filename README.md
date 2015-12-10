# GraphQL Custom Types
This is a collection of custom GraphQL types that I tend to reuse quite often so I packed them into a module.

## Available Types
### Scalar
#### GraphQLEmail
RFC 822 compliant E-Mail address

## Installation
```Bash
npm install graphql-custom-types
```

## Usage
```JavaScript
import { GraphQLEmail } from 'graphql-custom-types';
```

And use it in your Schema as you would use any other type.

## Development
Contributions are very welcome, please feel free to submit a type. If you do so make sure there are test cases in place.

### Testing
The test suite may be invoked by running:
```Bash
npm run test
```
