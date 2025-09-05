import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useApiStore } from '@/stores/apistore';

const PrivateRoutes: FC = () => {
    const user = useApiStore(state => state.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
