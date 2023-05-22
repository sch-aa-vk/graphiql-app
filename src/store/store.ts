import { combineReducers, configureStore } from '@reduxjs/toolkit';
import workspaceReducer from './workspaceSlice';
import workspaceEditorReducer from './workspaceEditorSlice';
import { countriesApi } from './countriesApiSlice';

const rootReducer = combineReducers({
  workspace: workspaceReducer,
  workspaceEditor: workspaceEditorReducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['workspace/addNestedObj'],
        ignoredPaths: ['workspace.nestedObjsArr'],
      },
    }).concat(countriesApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
