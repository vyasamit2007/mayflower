import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SimpleMap from './index';
import InputText from '../../atoms/forms/InputText'
import SelectBox from '../../atoms/forms/SelectBox'
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon'
import selectOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
//import GoogleApiWrapper from './index';

storiesOf('molecules', module)
  .add('GoogleMap', withInfo(/*`<div>${DividerDocs}</div>`*/)(() => (
    <React.Fragment>
    <div className="ma__location-filters">
      <InputText
        labelText="Address"
        required
        id="address-search"
        name="address-search"
        type="text"
        width={400}
        maxlength={0}
        pattern=""
        placeholder="city, town, or zipcode"
        errorMsg="You are required to enter an address."
        defaultText=""
      />
      <InputText
        labelText="Within Distance (miles)"
        required
        id="search-distance"
        name="search-distance"
        type="number"
        width={200}
        maxlength={0}
        pattern=""
        placeholder=""
        errorMsg="You must enter a search distance."
        defaultText=""
      />
     <SelectBox options={selectOptions.options.eec}/>
     <ButtonWithIcon />
     </div>
     <SimpleMap />
    </React.Fragment>
  )));
