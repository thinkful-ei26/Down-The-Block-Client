import React from 'react';
import { connect } from 'react-redux'
import './address-form.css'
import {Field, reduxForm} from 'redux-form';
import {required, nonEmpty} from '../common/validators';
import { fetchAddress } from '../../actions/geolocation';
import { showAnimation } from '../../actions/navigation';

export class AddressForm extends React.Component {

  componentDidMount(){
    this.props.dispatch(showAnimation(false));
  }

  onSubmit(values) {
      console.log(values);
      this.props.dispatch(showAnimation(true));
      return this.props.dispatch(fetchAddress(values));    
  }  

  render() {   
      let error;
      if (this.props.error) {
        error = (
          <div className="form-error" aria-live="polite">
            {this.props.error}
          </div>
        );
      }   
      return (
        <form 
        className= "address-form"
        onSubmit= {this.props.handleSubmit(values=> 
            {
            this.onSubmit(values);
            this.props.reset('addressForm');
            }
        )}>
            {error}
            <label htmlFor="street-address">Street Address</label>
            <Field
                component="input"
                type="text"
                name="street-address"
                id="street-address"
                // validate={[required, nonEmpty]}
            />
            <label htmlFor="city">City</label>
            <Field
                component="input"
                type="text"
                name="city"
                id="city"
                // validate={[required, nonEmpty]}
            />
            <label htmlFor="state">State</label>
            <Field
                component="input"
                type="text"
                name="state"
                id="state"
                // validate={[required, nonEmpty]}
            />
            <label htmlFor="zipcode">Zip Code</label>
            <Field
                component="input"
                type="text"
                name="zipcode"
                id="zipcode"
                validate={[required, nonEmpty]}
            />
            <button  disabled={this.props.pristine || this.props.submitting}>
                SUBMIT
            </button>
        </form> 
      )
  }
}

export default connect()(reduxForm({
  form: 'addressForm'
})(AddressForm))