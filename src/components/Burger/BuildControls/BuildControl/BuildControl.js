import React from 'react';
import './BuildControl.css'

const buildControl = (props) => (
 <div className = "BuildControl">
     <div className="Label">{props.lable}</div>
     <button className="Less">Less</button>
     <button className="More">More</button>
 </div>
);

export default buildControl;