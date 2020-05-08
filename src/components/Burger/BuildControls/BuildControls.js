import React from 'react';
import './BuildControls.css' 
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
];

const buildControls = (props) => (
   <div className="BuildControls">
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
      {
      controls.map(cont=> {
      return <BuildControl key={cont.label} label={cont.label} 
                 added ={ () => props.ingredientAdded (cont.type)}
                 removed = { () => props.ingredientRemoved(cont.type) }
                  disabled = {props.disabled[cont.type]}/>
      })}

    <button className="OrderButton" disabled= {!props.purchaseable} onClick= {props.ordered} >ORDER NOW</button>
   </div>
);

export default buildControls;