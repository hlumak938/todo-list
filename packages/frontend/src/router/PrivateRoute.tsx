import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '~store/user.store';
import { PUBLIC_ROUTER_KEYS } from '~shared/keys';

const PrivateRoute: React.FC = () => {
	const { isAuthenticated } = useUserStore();

	if (!isAuthenticated) {
		return <Navigate to={PUBLIC_ROUTER_KEYS.LOGIN} />;
	}

	return <Outlet />;
};

export default PrivateRoute;
