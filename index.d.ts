// tslint:disable max-classes-per-file
import {GraphQLScalarType} from "graphql";

declare namespace graphqlCustomTypes {

  type IASTParser<TResult = any> = (ast: {kind: string, value: string}) => TResult;

  interface IFactoryOptions {
    name: string;
    regex: RegExp;
    description: string;
    error?: string;
  }

  class Factory {
    public getRegexScalar(options: IFactoryOptions): GraphQLCustomScalarType;

    public getCustomScalar(name: string, description: string, parser: IASTParser): GraphQLCustomScalarType;
  }

  class GraphQLCustomScalarType extends GraphQLScalarType {
    constructor(name: string, description: string, parser: IASTParser);
  }

  const GraphQLEmail: GraphQLCustomScalarType;

  const GraphQLURL: GraphQLCustomScalarType;

  const GraphQLDateTime: GraphQLCustomScalarType;

  const GraphQLUUID: GraphQLCustomScalarType;

  class GraphQLPassword extends GraphQLCustomScalarType {
    constructor(min?: number, max?: number, alphabet?: string, complexity?: {
      alphaNumeric?: boolean,
      mixedCase?: boolean,
      specialChars?: boolean,
    });
  }

  class GraphQLLimitedString extends GraphQLCustomScalarType {
    constructor(min?: number, max?: number, alphabet?: boolean)
  }
}

export = graphqlCustomTypes;
