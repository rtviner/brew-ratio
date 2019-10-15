import PropTypes from 'prop-types';
import React from 'react';

import InputButton from '../InputButton';

const StrengthInput = ({ goldenRatio, light, med, strong, setGoldenRatio }) => (
		<div className="adjustables">
		  <h2 className="inputLabel">Coffee : Water</h2>
		  <form className="interactions">
		    <div className="strength">
		      <InputButton
		        className={goldenRatio === 18 ? 'active' : 'inactive'}
		        id="light"
		        name="goldenRatio"
		        value={`1:${light}`}
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
		        value={`1:${med}`}
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
		        value={`1:${strong}`}
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
    light: PropTypes.number,
    med: PropTypes.number,
    strong: PropTypes.number,
    setGoldenRatio: PropTypes.func
};

export default StrengthInput;