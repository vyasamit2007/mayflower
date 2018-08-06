import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createNamedContext, Provider, subscribe} from 'react-contextual';
import memoizeOne from 'memoize-one';



import UtilityNav from '../UtilityNav';
import MainNav from '../../molecules/MainNav';
import HeaderSearch from '../../molecules/HeaderSearch';
import SiteLogo from '../../atoms/media/SiteLogo';
import HeaderContext from './context';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      utilNavOpen: false
    };
    this.checkEquality = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    // First thing passed to subscribe is a mapContextToProps function.
    // The first variable in that function is the context object we expanded in the render function below.
    this.HeaderUtilityNav = subscribe(({ isOpen, utilityNav }) => ({ isOpen, ...utilityNav }))(utilityProps => {
      // utilityProps is the result of the mapContextToProps function above.
      return<UtilityNav {...utilityProps} />;
    });
    this.HeaderSearchWrapper = subscribe(({ headerSearch }, propsFromComponent = {}) => ({ ...propsFromComponent, ...headerSearch }))(headerSearchProps => {
      return<HeaderSearch {...headerSearchProps} />;
    });
    // Compare the results of the first function passed with the second function.
    // Only return a new object if there are changes.
    // memoizeOne takes care of updating its own cache for us.
    this.contextCheck = memoizeOne(contextProps => contextProps, this.checkEquality);
    this.contextCheck({
      isOpen: this.state.utilNavOpen,
      utilityNav: this.props.utilityNav,
      headerSearch: this.props.headerSearch
    });
  }
  menuButtonClicked() {
    const bodyClass = document.querySelector('body').classList;
    bodyClass.toggle('show-menu');
    if (bodyClass.value.length > 0) {
      this.setState({ utilNavOpen: false });
    } else {
      this.setState({ utilNavOpen: true });
    }
  }
  render() {
    const header = this.props;
    // By providing the context props here to Provider, we no longer need to pass props to the wrapper components.
    // The functions in the constructor takes care of any potential merging of context into props.
    const contextProps = this.contextCheck({
      isOpen: this.state.utilNavOpen,
      utilityNav: this.props.utilityNav,
      headerSearch: this.props.headerSearch
    });
    const { HeaderUtilityNav, HeaderSearchWrapper } = this;

    return(
      <Provider {...contextProps}>
        <header className="ma__header" id="header">
          {!header.hideBackTo && (
            <div className="ma__header__backto">
              <a href="http://www.mass.gov">Go to classic Mass.gov</a>
            </div>)}
          <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
          <div className="ma__header__utility-nav ma__header__utility-nav--wide">
            <HeaderUtilityNav />
          </div>
          <div className="ma__header__container">
            <div className="ma__header__logo">
              <SiteLogo {...header.siteLogoDomain} />
            </div>
            {!header.hideHeaderSearch &&
            <div className="ma__header__search js-header-search-menu">
              <HeaderSearchWrapper />
            </div>
            }
          </div>
          <nav className="ma__header__nav" aria-labelledby="main_navigation" id="main-navigation">
            <h2 id="main_navigation" className="visually-hidden">Main Navigation</h2>
            <div className="ma__header__button-container js-sticky-header">
              <button className="ma__header__back-button js-close-sub-nav">
                <span>Back</span>
              </button>
              <button
                className="ma__header__menu-button js-header-menu-button"
                onClick={() => this.menuButtonClicked()}
              >
                <span>Menu</span><span className="ma__header__menu-icon" />
              </button>
            </div>
            <div className="ma__header__nav-container">
              {!header.hideHeaderSearch &&
              <div className="ma__header__nav-search">
                <HeaderSearchWrapper />
              </div>
              }
              <div className="ma__header__main-nav">
                <MainNav {...header.mainNav} />
              </div>
              <div className="ma__header__utility-nav ma__header__utility-nav--narrow">
                <HeaderUtilityNav />
              </div>
            </div>
          </nav>
        </header>
      </Provider>
    );
  }
}

Header.propTypes = {
  /** imports the utilityNav component */
  utilityNav: PropTypes.shape(UtilityNav.propTypes).isRequired,
  /** imports the headersearch component */
  headerSearch: PropTypes.shape(HeaderSearch.propTypes).isRequired,
  /** imports the mainnav component */
  mainNav: PropTypes.shape(MainNav.propTypes).isRequired,
  /** Adds a prop to hide header search in the header */
  hideHeaderSearch: PropTypes.bool,
  /** Adds a prop to not display go back to classic.mass.gov */
  hideBackTo: PropTypes.bool,
  /** The domain you want to send users to from the site logo icon */
  siteLogoDomain: PropTypes.shape(SiteLogo.propTypes)
};

Header.defaultProps = {
  hideHeaderSearch: false,
  hideBackTo: false
};

export default Header;
