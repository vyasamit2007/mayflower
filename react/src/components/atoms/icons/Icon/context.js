import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';


const IconContext = React.createContext({});

export function withIcon(MyComponent, compProps = {}) {
  class HocComponent extends React.Component {
    render() {
      return(
        <IconContext.Consumer>
          {(contextProps) => {
            // Make a copy of compProps to prevent mutation.
            const newProps = {
              ...JSON.parse(JSON.stringify(compProps)),
              headerContext: { ...contextProps }
            };
            return(<MyComponent {...newProps} />);
          }}
        </IconContext.Consumer>);
    }
  }
  // Copies static methods over, if any.
  hoistNonReactStatic(HocComponent, MyComponent);
  return HocComponent;
}

export default IconContext;
