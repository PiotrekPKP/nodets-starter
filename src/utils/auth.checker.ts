import { ArgsDictionary, AuthChecker } from "type-graphql";
import { GraphQLResolveInfo } from "graphql";

export const authChecker: AuthChecker = ({ context }: { root: AuthChecker, args: ArgsDictionary, context: any, info: GraphQLResolveInfo }) => {
    return true;
}