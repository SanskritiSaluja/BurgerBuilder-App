import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button"
import './ContactData.css'

class ContactDtata extends Component {
    state = { 
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        }
      }
    render() { 
        return ( <div className="ContactData">
            <h4>Enter your Contact Data</h4>
             <form>
                 <input className="Input" type="text" name ="name" placeholder = "Your Name" />
                 <input className="Input" type="email" name="email" placeholder= "Your Email" />
                <input className="Input" type="text" name ="street" placeholder = "Your Street" />
                 <input className="Input" type="text" name ="postal" placeholder = "Your Postal" />
                 <Button btnType="Success"></Button>
             </form>
        </div> );
    }
}
 
export default ContactDtata;