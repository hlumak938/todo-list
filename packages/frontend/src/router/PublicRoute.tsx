import React from 'react';
import { useUserStore } from '~store/user.store';
import { PRIVATE_ROUTER_KEYS } from '~shared/keys';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
	const { isAuthenticated } = useUserStore();

	if (isAuthenticated) {
		return <Navigate to={PRIVATE_ROUTER_KEYS.TODOS} />;
	}

	return <Outlet />;
};

export default PublicRoute;
