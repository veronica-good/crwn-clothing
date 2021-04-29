import { createSelector } from 'reselect';
import { selectCartTotal } from '../cart/cart.selectors';

const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
)