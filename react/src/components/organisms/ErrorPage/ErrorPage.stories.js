import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import ErrorPage from '.';
import ErrorPageReadme from './ErrorPage.md';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('ErrorPage', withInfo(`<div>${ErrorPageReadme}</div>`)(() => {
    const props = {
      type: text('errorPage.type', '404'),
      label: text('errorPage.label', 'Oops'),
      title: text('errorPage.title', 'We can\'t find that page'),
      message: text('errorPage.message', 'The link you clicked may be broken or the page may have been removed')
    };
    return(<ErrorPage {...props} />);
  }));
