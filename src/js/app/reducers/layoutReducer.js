// @flow
import createReducer from './createReducer';
import { type LayoutState, makeLayoutState } from '../states';
import { layoutAction, type MenuLeftOpenedAction } from '../actions';

type MenuLeftOpenedFn = (state: LayoutState, action: MenuLeftOpenedAction) => LayoutState;
type ToggleMenuFn = (state: LayoutState) => LayoutState ;

const menuLeftOpened: MenuLeftOpenedFn = (state, action) => (
  state.merge({
    shouldMenuLeftOpened: action.shouldMenuLeftOpened,
    isMenuCurrentlyOpened: action.isMenuCurrentlyOpened,
  })
);

const toggleMenu: ToggleMenuFn = state => (
  state.set('isMenuCurrentlyOpened', !state.get('isMenuCurrentlyOpened'))
);

export default createReducer(makeLayoutState(), {
  [layoutAction.ACTION_TYPES.MENU_LEFT_OPENED]: menuLeftOpened,
  [layoutAction.ACTION_TYPES.TOGGLE_MENU]: toggleMenu,
});
