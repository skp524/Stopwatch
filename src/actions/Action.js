import {types} from '../reducers/Reducer';

export const updateState = change => ({
  type: types.UPDATESTATE,
  change,
});
