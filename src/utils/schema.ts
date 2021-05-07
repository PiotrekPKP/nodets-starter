import { buildSchema } from "type-graphql";
import { authChecker } from "./auth.checker";
import { UserInputError, Request } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { ValidationError } from "class-validator";
import ExampleResolver from "../resolvers/example.resolver";

export const createSchema = () => buildSchema({
    resolvers: [ExampleResolver],
    emitSchemaFile: true,
    authChecker
});

export const errorFormatting = (error: GraphQLError) => {
    let errorStack: string[] = [];
    if(error.extensions?.exception.validationErrors) { error.extensions.exception.validationErrors
        .forEach((validationError: ValidationError) => errorStack.push(validationError.constraints
            ? validationError.constraints[Object.keys(validationError.constraints)[0]] : "")) }
    else { errorStack = error.extensions?.errors ? error.extensions.errors : [] }
    return new UserInputError(errorStack[0], { errors: errorStack })
}

export const getContext = ({ req }: { req: Request }) => {
    return ({ req });
}