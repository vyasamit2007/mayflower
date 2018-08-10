import React from 'react';
import GoogleMap from 'google-map-react';


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

export default class SimpleMap extends React.Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11,
    apiKey: 'AIzaSyCn7qQ15mTZTKC1OlZeE0OnTANbtSY2Np4'
  };

  render() {
    return (
      <div style={{width: '100%', height: '400px'}}>
         <GoogleMap
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={{key: this.props.apiKey}}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMap>
      </div>
    );
  }
}


// export default GoogleApiWrapper({
//   apiKey: ('AIzaSyCn7qQ15mTZTKC1OlZeE0OnTANbtSY2Np4')
// })(MapContainer)
