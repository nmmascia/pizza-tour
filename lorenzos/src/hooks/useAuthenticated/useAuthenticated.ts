import useLocalStorage from 'react-use/lib/useLocalStorage';
import jwtDecode from 'jwt-decode';

interface UseAuthenticatedPayload {
  authenticated: boolean;
  user: { id: number } | null;
}

const useAuthenticated = (): UseAuthenticatedPayload => {
  const lsReturn = useLocalStorage('token');
  const token = lsReturn[0] as string;

  if (token) {
    const { sub: user } = jwtDecode(token);
    return { authenticated: true, user };
  } else {
    return { authenticated: false, user: null };
  }
};

export default useAuthenticated;
