
import { User } from 'firebase/auth';

export interface GlobalContextProps {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}
