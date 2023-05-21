import {
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';

// eslint-disable-next-line
export type TGrphQLField = GraphQLField<any, any>;
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
