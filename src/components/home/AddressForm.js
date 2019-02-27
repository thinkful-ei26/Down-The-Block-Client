import React from 'react';
import { connect } from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './address-form.scss'

import { showAnimation } from '../../actions/navigation';
import { fetchAddressSuccess } from '../../actions/geolocation';
import { setUserCoords } from '../../actions/users';

 
class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };

  componentDidMount(){
    console.log('In Address Form Mount')
    this.props.dispatch(showAnimation(false));
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      // .then(googleCoords => console.log('Success', googleCoords))
      .then(googleCoords => {
          let coords = {
            latitude: googleCoords.lat,
            longitude: googleCoords.lng,
            automatic: false
        };
        this.props.dispatch(showAnimation(false));
        this.props.dispatch(fetchAddressSuccess(coords));
        this.props.dispatch(setUserCoords(coords));
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <section className="parallax"></section>
            <section className="intro">
              <section className="form-section address-form">
                <input
                  {...getInputProps({
                    placeholder: 'Enter your address here...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {/* {loading && <div>Loading...</div>} */}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                      const style = suggestion.active
                      ? { backgroundColor: '#06311f', color: 'rgb(237, 236, 217)', cursor: 'pointer' }
                      : { backgroundColor: 'rgb(237, 236, 217)', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
                </section>
            </section>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default connect()(AddressForm);