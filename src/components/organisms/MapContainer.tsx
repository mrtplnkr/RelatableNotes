import { Map, GoogleApiWrapper } from 'google-maps-react';
import * as React from 'react';

export interface IMapContainerProps {
    google: string;
}

class MapContainer extends React.Component<IMapContainerProps> {
  public render() {
    return (
      <div>
        <Map google={this.props.google}
            center={ 'lat: -34.397, lng: 150.644' } />
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyDMjSeiImhm5Ha5qQv2-eOTSHBEEaOcRDg'})(MapContainer);