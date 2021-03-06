import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import UtilityPanel from '.';
import UtilityPanelDocs from './UtilityPanel.md';
import UtilityPanelData from './UtilityPanel.json';

storiesOf('organisms', module).addDecorator(withKnobs)
  .add('UtilityPanel', withInfo(`<div>${UtilityPanelDocs}</div>`)(() => (
    <UtilityPanel {...UtilityPanelData} />
  )));
