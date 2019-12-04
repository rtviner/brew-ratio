import PropTypes from 'prop-types';
import React from 'react';

import InputButton from '../shared/InputButton';

const light = "18"
const med = "15.5"
const strong = "13"

const StrengthInput = ({ goldenRatio, setGoldenRatio }) => (
		<div className="adjustables">
		  <h2 className="inputLabel">1g Coffee : Xg Water</h2>
		  <form className="interactions">
		    <div className="strength">
		      <InputButton
		        className={goldenRatio === 18 ? 'active' : 'inactive'}
		        id="light"
		        name="goldenRatio"
		        value={light}
		        onClick={setGoldenRatio}
		      />
		      <label className="strength" htmlFor="light">
		        light
		      </label>
		    </div>

		    <div className="strength">
		      <InputButton
		        className={goldenRatio === 15.5 ? 'active' : 'inactive'}
		        id="med"
		        name="goldenRatio"
		        value={med}
		        onClick={setGoldenRatio}
		      />
		      <label className="strength" htmlFor="med">
		        medium
		      </label>
		    </div>

		    <div className="strength">
		      <InputButton
		        className={goldenRatio === 13 ? 'active' : 'inactive'}
		        id="strong"
		        name="goldenRatio"
		        value={strong}
		        onClick={setGoldenRatio}
		      />
		      <label className="strength" htmlFor="strong">
		        strong
		      </label>
		    </div>
		  </form>
		</div>
);

StrengthInput.propTypes = {
    goldenRatio: PropTypes.number,
    light: PropTypes.string,
    med: PropTypes.string,
    strong: PropTypes.string,
    setGoldenRatio: PropTypes.func
};

export default StrengthInput;