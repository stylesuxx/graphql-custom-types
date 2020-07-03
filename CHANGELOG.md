# Changelog
## [Unreleased]

## [1.6.0] - 2020-07-03
- Updated graphql peer dependency
- Dropped support for NodeJs < 6.9
- Improved .gitignore

## [1.5.1] - 2019-07-10
### Fixed
- TS Password definition

## [1.5.0] - 2018-11-22
- Updated graphql peer dependency

## [1.4.0] - 2018-05-20
- Updated graphql peer dependency

## [1.3.0] - 2018-01-31
- Updated graphql peer dependency
- Updated dev dependencies
- Adjusted test cases - graphql ^0.12.0 is not throwing errors when validation fails, instead it is populating an error property in the result object. Testing will fail with older graphql versions.

## [1.2.0] - 2017-10-02
- Updated peer dependency

## [1.1.0] - 2017-06-28
- Added typescript definitions
- Added editorconfig

## [1.0.0] - 2017-06-19
- Updated peer dependency

## [0.7.3] - 2017-05-05
- Updated peer dependency

## [0.7.2] - 2016-11-15
- Updated dev dependencies

## [0.7.1] - 2016-11-14
- Updated graphql dependencies

## [0.7.0] - 2016-09-20
### Improved
- Added badges for dev and peer dependencies

### Updated dependencies
- graphql
- eslint

### Fixed
- Properly import Factory

## [0.6.0] - 2016-06-09
### Improved
- graphql is now a peerDependecy

### Fixed
- Date validation

## [0.5.1] - 2016-06-08
### Updated dependencies
- graphql to ^0.6.0

## [0.5.0] - 2016-06-08
### Imporoved
- Properly parse values

## [0.4.0] - 2016-05-10
### Added
- Export factory and GraphQLCustomScalarType
- Test against nodeJS >= 4.4 && <= 6.1

### Removed
- Support for iojs
- Support for nodeJS < 4.4

## [0.2.0] - 2015-12-12
### Added
- GraphQLDateTime

## [0.1.1] - 2015-12-11
### Improved
- Packaging for NPM

## [0.1.0] - 2015-12-11
### Added
- Custom scalar factory
- RegExp type factory
- GraphQLURL
- GraphQLLimitedString
- GraphQLPassword
- CHANGELOG

### Improved
- Test cases
- README
- Improved NPM config, exlude files that are not needed to use the library

### Deprecated
- Dropped support for NodeJs < 0.11.0

## [0.0.0] - 2015-12-9
### Added
- GraphQLEmail
