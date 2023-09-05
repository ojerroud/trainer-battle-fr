import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { generateKey } from '../../utils/generateKey';
// import { updateRewardValue } from '../../actions';

function Test() {
	// const player = useSelector((state) => state.player);
	// const zone = useSelector((state) => state.zone);
	const [value, setValue] = useState('test');

	// const dispatch = useDispatch();

	return (
		<div className="test">
			<input
				defaultValue={value}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					console.log(value);
				}}
			/>
		</div>
	);
}

export default Test;
