import {
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import { TGrphQLField, TNestedObjs } from '../../models';

function getSchemaItem(
  nestedObj: TNestedObjs | GraphQLSchema | null,
  nestedKeysArr: Array<string[]>
): TNestedObjs | GraphQLSchema | null {
  let result: TNestedObjs | GraphQLSchema | null = nestedObj;
  const keysArr = [...nestedKeysArr];

  if (!result) return result;

  const [firstKeysInnerArr, ...restKeysArr] = keysArr;
  const [firstKey, ...restKeysInnerArr] = firstKeysInnerArr;

  if (firstKey[0] === '_') {
    if (firstKey === '_queries') {
      const queryType = (result as GraphQLSchema).getQueryType();
      result = queryType || null;
    }

    if (firstKey === '_fields') {
      const fields = (result as GraphQLObjectType | GraphQLInputObjectType).getFields();
      const [fieldName, ...otherKeysArr] = restKeysInnerArr;
      result = fields[fieldName] as TGrphQLField;

      if (otherKeysArr.length) {
        const newResult = getSchemaItem(result, [otherKeysArr]);
        result = newResult;
      }
    }
  } else if (firstKey === 'args') {
    const { args } = result as TGrphQLField;
    let newResult = args[0].type as GraphQLInputType;
    const [nextKey] = restKeysInnerArr;

    if (nextKey === 'ofType') {
      const ofTypeObj = (newResult as GraphQLNonNull<GraphQLScalarType>).ofType;
      newResult = ofTypeObj as GraphQLScalarType;
    }

    result = newResult as TNestedObjs;
  } else if (firstKey === 'type') {
    let newResult = (result as TGrphQLField).type;
    const isEveryStringOfType = restKeysInnerArr.every((key) => key === 'ofType');

    if (isEveryStringOfType) {
      restKeysInnerArr.forEach(() => {
        const calculatedResult = (newResult as GraphQLList<GraphQLOutputType>).ofType;
        newResult = calculatedResult;
      });
    }
    result = newResult as TNestedObjs;
  }

  if (restKeysArr.length) {
    const newResult = getSchemaItem(result, restKeysArr);
    result = newResult;
  }

  return result;
}

export default getSchemaItem;
