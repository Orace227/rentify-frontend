import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useCustomer } from './useSeller';
import { useDispatch } from 'react-redux';
import { customer } from '@/store/apps/chat/ChatSlice';

const useAuth = () => {
  const router = useRouter();
  const { updateCustomer } = useCustomer();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const response = await axios.post('/customer/auth/verifyUser');
        const { status, firstName, lastName, email, customerId, profileImagePath } = response.data;
        if (status === 'authenticated') {
          updateCustomer({
            firstName: firstName,
            lastName: lastName,
            email: email,
            customerId: customerId,
            profileImagePath: profileImagePath,
          });
          dispatch(
            customer({
              firstName: firstName,
              lastName: lastName,
              email: email,
              customerId: customerId,
              profileImagePath: profileImagePath,
            }),
          );
          return true;
        } else {
          console.log('verification failed');
          return false;
        }
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    };

    const checkUser = async () => {
      const tokenValue = await Cookies.get('customerAuthToken');
      console.log(tokenValue);
      if (tokenValue) {
        const hasAuthToken = await checkAuthToken();
        console.log(hasAuthToken);
        if (!hasAuthToken) {
          router.push('/auth/login');
        }
      } else {
        router.push('/auth/login');
      }
    };

    // Call the async function inside useEffect
    checkUser();
  }, []);

  return;
};

export default useAuth;
