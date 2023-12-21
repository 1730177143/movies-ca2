import { useContext } from 'react';
import { AuthContext } from './authContext';

export const useAuth = () => {
    const { userId } = useContext(AuthContext);
    return { userId };
};