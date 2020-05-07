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
      {
      controls.map(cont=> {
      return <BuildControl key={cont.label} label={cont.label} 
                 added ={ () => props.ingredientAdded (cont.type)}
                 removed = { () => props.ingredientRemoved(cont.type) }
                  disabled = {props.disabled[cont.type]}/>
      })}
   </div>
);

export default buildControls;