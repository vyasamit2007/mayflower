import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';


import UtilityNav from '../UtilityNav';
import MainNav from '../../molecules/MainNav';
import HeaderSearch from '../../molecules/HeaderSearch';
import SiteLogo from '../../atoms/media/SiteLogo';
import HeaderContext, { withHeader } from './context';

const memoCheck = memoize((propsToCheck) => propsToCheck);
let UtilityNavOpen;
let UtilityNavClosed;
let HeaderSearchWrapper;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilNavOpen: false
    };
    const headerUtilityNavProps = JSON.parse(JSON.stringify(this.props.utilityNav));
    const headerUtilityNavOpen = { isOpen: true, ...headerUtilityNavProps };
    const headerUtilityNavClosed = { isOpen: false, ...headerUtilityNavProps };
    const allProps = {
      utilityPropsOpen: headerUtilityNavOpen,
      utilityPropsClosed: headerUtilityNavClosed,
      headerSearchProps: this.props.headerSearch
    };
    const { utilityPropsOpen, utilityPropsClosed, headerSearchProps } = { ...memoCheck(allProps) };
    // HOCs can not be defined in the render function because they will unmount and re-mount every render.
    //UtilityNavOpen = withHeader(UtilityNav, utilityPropsOpen);
    UtilityNavClosed = withHeader(UtilityNav, utilityPropsClosed);
    HeaderSearchWrapper = withHeader(HeaderSearch, headerSearchProps);
  }
  static getDerivedStateFromProps(props, state) {
    const headerUtilityNavProps = JSON.parse(JSON.stringify(props.utilityNav));
    const headerUtilityNavOpen = { isOpen: true, ...headerUtilityNavProps };
    const headerUtilityNavClosed = { isOpen: false, ...headerUtilityNavProps };

    const allProps = {
      utilityPropsOpen: headerUtilityNavOpen,
      utilityPropsClosed: headerUtilityNavClosed,
      headerSearchProps: props.headerSearch
    };
    const { utilityPropsOpen, utilityPropsClosed, headerSearchProps } = { ...memoCheck(allProps) };

    //UtilityNavOpen = withHeader(UtilityNav, utilityPropsOpen);
    UtilityNavClosed = withHeader(UtilityNav, utilityPropsClosed);
    HeaderSearchWrapper = withHeader(HeaderSearch, headerSearchProps);
    return state;
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
    const HeaderUtilityNav = (this.state.utilNavOpen) ? UtilityNavOpen : UtilityNavClosed;
    // const utilNavOpen = { isOpen: this.state.utilNavOpen };
    // const HeaderUtilityNavProps = Object.assign({}, header.utilityNav, utilNavOpen);
    // const HeaderUtilityNav = <UtilityNav {...HeaderUtilityNavProps} />;

    return(
      <HeaderContext.Provider value={header}>
      <header className="ma__header" id="header">
        {!header.hideBackTo && (
          <div className="ma__header__backto">
            <a href="http://www.mass.gov">Go to classic Mass.gov</a>
          </div>)}
        <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
        <div className="ma__header__utility-nav ma__header__utility-nav--wide">
          {(UtilityNavClosed) && (<UtilityNavClosed />)}
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
              {!header.hideHeaderSearch &&
                <HeaderSearchWrapper id="nav-search" />
              }
            </div>
            }
            <div className="ma__header__main-nav">
              <MainNav {...header.mainNav} />
            </div>
            <div className="ma__header__utility-nav ma__header__utility-nav--narrow">
            </div>
          </div>
        </nav>
      </header>
      </HeaderContext.Provider>
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
