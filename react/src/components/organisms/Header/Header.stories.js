import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, object, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Header from './index';
import HeaderDocs from './Header.md';
import MainNavData from '../../molecules/MainNav/MainNav.knob.options';
import UtilityNavData from '../UtilityNav/UtilityNav.knob.options';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('Header', withInfo(`<div>${HeaderDocs}</div>`)(() => {
    const mainNavProps = {
      mainNav: []
    };
    mainNavProps.mainNav = MainNavData.mainNav.map((nav, navIndex) => {
      let active = false;
      if (typeof nav.active === 'string') {
        active = (nav.active.toLowerCase() === 'true');
      } else if (typeof nav.active === 'boolean') {
        active = nav.active;
      } else {
        active = false;
      }
      const storyProps = {
        href: text(`mainNav.href${navIndex}`, nav.href),
        text: text(`mainNav.text${navIndex}`, nav.text),
        active: boolean(`mainNav.active${navIndex}`, active),
        subNav: object(`mainNav.subNav${navIndex}`, nav.subNav)
      };
      return(storyProps);
    });
    const utilityProps = {
      items: []
    };
    utilityProps.items = UtilityNavData.items.map((item, itemIndex) => {
      const icons = {
        building: 'building',
        login: 'login'
      };
      const storyProps = {
        text: text(`utilityNav.text.${itemIndex}`, item.text),
        ariaLabelText: text(`utilityNav.ariaLabelText.${itemIndex}`, item.ariaLabelText),
        closeText: text(`utilityNav.closeText.${itemIndex}`, item.closeText),
        panel: object(`utilityNav.panel.${itemIndex}`, item.panel)
      };
      storyProps.icon = select(`utilityNav.icons.${itemIndex}`, icons, item.icon);
      return(storyProps);
    });
    const headerSearchProps = {
      placeholder: text('searchBannerForm.placeholder', 'Search Mass.gov'),
      buttonSearch: {
        ariaLabel: 'Search',
        onClick: (e) => {
          action('Search button clicked')(e);
          e.preventDefault();
        },
        usage: 'secondary'
      },
      onSubmit: action('Form submitted'),
      onChange: action('Text input modified')
    };
    const siteLogoDomainProps = {
      url: {
        domain: text('header.siteLogoDomain.url.domain', 'https://www.mass.gov/')
      }
    };
    const headerProps = {
      utilityNav: utilityProps,
      headerSearch: headerSearchProps,
      mainNav: mainNavProps,
      hideHeaderSearch: boolean('Header.hideHeaderSearch', false),
      hideBackTo: boolean('header.hideBackTo', false),
      siteLogoDomain: siteLogoDomainProps
    };
    return(<Header {...headerProps} />);
  }));
