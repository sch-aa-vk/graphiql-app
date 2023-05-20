import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType } from 'graphql';

export type TFieldArgType = {
  ofType: Rrr;
  [Symbol.toStringTag]: string;
  toJSON: () => string;
};

export interface Rrr extends GraphQLScalarType {
  name: string;
}

export type TGrphQLNonNullScalar = GraphQLNonNull<GraphQLScalarType>;
export type TGrphQLListNonNullScalar = GraphQLList<TGrphQLNonNullObj>;

export type TGrphQLNonNullObj = GraphQLNonNull<GraphQLObjectType>;
export type TGrphQLOfTypeObj = GraphQLList<TGrphQLNonNullObj>;
export type TGrphQLOfTypeNonNullObj = GraphQLNonNull<TGrphQLOfTypeObj>;
