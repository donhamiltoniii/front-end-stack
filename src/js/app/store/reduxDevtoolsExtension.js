// @flow
/**
 * Enabling Redux DevTools.
 *
 * See https://github.com/zalmoxisus/redux-devtools-extension
 */
const reduxDevtoolsExtension = (): Function =>
  /* eslint-disable no-underscore-dangle */
  typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;
/* eslint-enable no-underscore-dangle */

export default reduxDevtoolsExtension;
