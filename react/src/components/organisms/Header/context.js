import React from 'react';

import Header from './index';
import { createNamedContext, createStore, namedContext } from 'react-contextual';

const HeaderContext = namedContext('HeaderContext', {
  /** imports the utilityNav component */
  utilityNav: {},
  /** imports the headersearch component */
  headerSearch: {},
  isOpen: false
});

export const store = createStore({
  /** imports the utilityNav component */
  utilityNav: {},
  /** imports the headersearch component */
  headerSearch: {},
  /** imports the mainnav component */
  mainNav: {},
  /** Adds a prop to hide header search in the header */
  hideHeaderSearch: false,
  /** Adds a prop to not display go back to classic.mass.gov */
  hideBackTo: false,
  /** The domain you want to send users to from the site logo icon */
  siteLogoDomain: {}
});

export default HeaderContext;

