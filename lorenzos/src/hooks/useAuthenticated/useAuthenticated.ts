import jwtDecode from 'jwt-decode';

interface UseAuthenticatedPayload {
  authenticated: boolean;
  user: { id: number } | null;
}

const useAuthenticated = (): UseAuthenticatedPayload => {
  const token: string | null = localStorage.getItem('token');

  if (token) {
    const { user } = jwtDecode(token);
    console.log('Active User:', user);
    return { authenticated: true, user };
  } else {
    console.log('No Token');
    return { authenticated: false, user: null };
  }
};

export default useAuthenticated;
