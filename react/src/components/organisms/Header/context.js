
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import entries from 'object.entries';

const HeaderContext = React.createContext({
  utilNavOpen: false,
  menuButtonClicked() {
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-menu');
    this.utilNavOpen = !(bodyClass.value.length > 0);
  },
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

export function withHeader(MyComponent, compProps = {}) {
  class HocComponent extends React.Component {
    render() {
      return(
        <HeaderContext.Consumer>
          {(contextProps) => {
            const keys = entries(contextProps);
            const filteredKeys = keys.map(key => {
              const test = key[1];
              if (JSON.stringify(compProps) !== JSON.stringify(test)) {
                return key[0];
              }
              return null;
            });
            const filteredContext = {};
            filteredKeys.forEach(key => {
              if (Object.prototype.hasOwnProperty.call(contextProps, key)) {
                filteredContext[key] = contextProps[key];
              }
            });
            // Make a copy of compProps to prevent mutation.
            const newProps = {
              ...JSON.parse(JSON.stringify(compProps)),
              ...JSON.parse(JSON.stringify(filteredContext))
            };
            return(<MyComponent {...newProps} />);
          }}
        </HeaderContext.Consumer>);
    }
  }
  return HocComponent;
  // Copies static methods over, if any.
  //return hoistNonReactStatic(HocComponent, MyComponent);
}

export default HeaderContext;
