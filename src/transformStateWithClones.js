'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const value = action.extraData;

      for (const key in value) {
        stateClone[key] = value[key];
      }
      result.push({ ...stateClone });
    } else if (action.type === 'removeProperties') {
      for (const toRemove of action.keysToRemove) {
        delete stateClone[toRemove];
      }
      result.push({ ...stateClone });
    } else if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
      result.push({ ...stateClone });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
