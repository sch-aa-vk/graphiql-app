import {
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';

export type TGrphQLField = GraphQLField<undefined, undefined>;
export type TNestedObjs =
  | GraphQLObjectType
  | TGrphQLField
  | GraphQLInputObjectType
  | GraphQLScalarType;

export interface Workspace {
  docsPanelVisible: boolean;
  docsFetched: boolean;
  nestedObjsArr: Array<TNestedObjs>;
}

export interface State {
  workspace: Workspace;
}
