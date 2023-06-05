import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';

export type TFieldArgType = {
  ofType: IScalarWithName;
  [Symbol.toStringTag]: string;
  toJSON: () => string;
};

export interface IScalarWithName extends GraphQLScalarType {
  name: string;
}

export type TGrphQLNonNullScalar = GraphQLNonNull<GraphQLScalarType>;
export type TGrphQLListNonNullScalar = GraphQLList<TGrphQLNonNullObj>;

export type TGrphQLNonNullObj = GraphQLNonNull<GraphQLObjectType>;
export type TGrphQLOfTypeObj = GraphQLList<TGrphQLNonNullObj>;
export type TGrphQLOfTypeNonNullObj = GraphQLNonNull<TGrphQLOfTypeObj>;

export type TNestedObj = GraphQLObjectType | GraphQLInputObjectType | GraphQLScalarType | null;
