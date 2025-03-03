
import Head from 'next/head';
import App from '../client/src/App';

export default function Home() {
  return (
    <>
      <Head>
        <title>Your Application</title>
        <meta name="description" content="Your application description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </>
  );
}
