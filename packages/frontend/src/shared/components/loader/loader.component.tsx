import * as React from 'react';
import {
	loaderContainer,
	spinnerStyle,
} from '~shared/components/loader/loader.styles';

const Loader: React.FC = () => {
	return (
		<div className={loaderContainer}>
			<div className={spinnerStyle}></div>
			<span>Loading...</span>
		</div>
	);
};

export default Loader;
