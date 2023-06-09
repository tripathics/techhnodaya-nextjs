'use client'
import Navbar from '@/components/navbar/';
import Footer from '@/components/footer/';
import styles from '../(pages)/layout.module.scss';
import styles2 from './layout.module.scss';
import { useUser } from '@/contexts/user';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading-screen';

export default function Layout({ children }) {
  const { user, loading, setRedirected } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      setRedirected(true);
      router.push('/login');
    }
  }, [loading, user]);

  return (<>
    <Navbar />
    <main className={styles.main}>
      {loading
        ? <LoadingScreen />
        : user
          ? children
          : <div className={'container'}>Redirecting to login...</div>
      }
    </main>
    <Footer className={styles2.footer} />
  </>)
}