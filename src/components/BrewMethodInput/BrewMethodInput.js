import PropTypes from 'prop-types';
import React from 'react';

import InputButton from '../shared/InputButton';

const BrewMethodInput = ({ method, setMethod }) => (
		<div className="adjustables">
		  <h2 className="inputLabel">Brew Method</h2>
		  <form className="interactions">
		    <div className="method">
		      <InputButton
		        className={method === "AeroPress" ? 'active' : 'inactive'}
		        id="aeroPress"
		        name="method"
		        value="AeroPress"
		        onClick={setMethod}
		      />
		    </div>

		    <div className="method">
		      <InputButton
		        className={method === "French Press" ? 'active' : 'inactive'}
		        id="frenchPress"
		        name="method"
		        value="French Press"
		        onClick={setMethod}
		      />
		    </div>

		    <div className="method">
		      <InputButton
		        className={method === "Pour Over" ? 'active' : 'inactive'}
		        id="pourOver"
		        name="method"
		        value="Pour Over"
		        onClick={setMethod}
		      />
		    </div>
		  </form>
		</div>
);

BrewMethodInput.propTypes = {
    method: PropTypes.string,
    setMethod: PropTypes.func
};

export default BrewMethodInput;