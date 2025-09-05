import type { FC } from 'react';
import { useEffect } from 'react';
import * as React from 'react';

import { useApiStore } from '@/stores/apistore';

export interface ApiFetchWrapperProps {
    children: React.ReactNode;
}

const ApiFetchWrapper: FC<ApiFetchWrapperProps> = ({ children }) => {
    const fetchUser = useApiStore(state => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, []);

    return <>{children}</>;
};

export default ApiFetchWrapper;
