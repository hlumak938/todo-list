import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '~router/routes';

const Router: React.FunctionComponent = () => {
	return (
		<RouterProvider router={router} future={{ v7_startTransition: true }} />
	);
};

export default Router;
