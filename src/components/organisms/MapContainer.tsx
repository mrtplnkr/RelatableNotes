import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import * as React from 'react';

export interface IMapContainerProps {
    google: string;
}

class MapContainer extends React.Component<IMapContainerProps> {
  public render() {
    return (
      <div>
        <Map google={this.props.google}>

<Marker mapCenter={'lat: -3.397, lng: 1.644'} onClick={() => alert()} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyDMjSeiImhm5Ha5qQv2-eOTSHBEEaOcRDg'})(MapContainer);