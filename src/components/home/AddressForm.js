// import React from 'react';
// import { connect } from 'react-redux'
// import './address-form.css'
// import {Field, reduxForm} from 'redux-form';
// import {required, nonEmpty} from '../common/validators';
// import { fetchAddress } from '../../actions/geolocation';
// import { showAnimation } from '../../actions/navigation';

// export class AddressForm extends React.Component {

//   componentDidMount(){
//     console.log('In Address Form Mount')
//     this.props.dispatch(showAnimation(false));
//   }

//   onSubmit(values) {
//       console.log(values);
//       this.props.dispatch(showAnimation(true));
//       return this.props.dispatch(fetchAddress(values));    
//   }  

//   render() {   
//       let error;
//       if (this.props.error) {
//         error = (
//           <div className="form-error" aria-live="polite">
//             {this.props.error}
//           </div>
//         );
//       }   
//       return (
//         <form 
//         className= "address-form"
//         onSubmit= {this.props.handleSubmit(values=> 
//             {
//             this.onSubmit(values);
//             this.props.reset('addressForm');
//             }
//         )}>
//             {error}
//             <label htmlFor="street-address">Street Address</label>
//             <Field
//                 component="input"
//                 type="text"
//                 name="street-address"
//                 id="street-address"
//                 // validate={[required, nonEmpty]}
//             />
//             <label htmlFor="city">City</label>
//             <Field
//                 component="input"
//                 type="text"
//                 name="city"
//                 id="city"
//                 // validate={[required, nonEmpty]}
//             />
//             <label htmlFor="state">State</label>
//             <Field
//                 component="input"
//                 type="text"
//                 name="state"
//                 id="state"
//                 // validate={[required, nonEmpty]}
//             />
//             <label htmlFor="zipcode">Zip Code</label>
//             <Field
//                 component="input"
//                 type="text"
//                 name="zipcode"
//                 id="zipcode"
//                 validate={[required, nonEmpty]}
//             />
//             <button  disabled={this.props.pristine || this.props.submitting}>
//                 SUBMIT
//             </button>
//         </form> 
//       )
//   }
// }

// export default connect()(reduxForm({
//   form: 'addressForm'
// })(AddressForm))

import React from 'react';
import { connect } from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './address-form.css'

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
      // .then(googleCoords => console.log('Success', googleCoords))
      .catch(error => console.error('Error', error));
  };
 
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="address-form">
            <input
              {...getInputProps({
                placeholder: 'Enter your address here...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default connect()(AddressForm);