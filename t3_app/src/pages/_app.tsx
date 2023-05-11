import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import '~/styles/globals.css';
import Head from 'next/head';
import { SideNav } from '../components/Sidenav';
import { api } from '~/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>Recipe</title>
                <meta name="description" content="recipe app"></meta>
            </Head>
            <div className="container mx-auto flex items-start sm:pr-4">
                <SideNav />
                <div className="min-h-screen flex-grow border-x">
                    <Component {...pageProps} />
                </div>
            </div>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
