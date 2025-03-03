
import App from '../client/src/App';
import MetaTags from '../client/src/components/MetaTags';

export default function Home() {
  return (
    <>
      <MetaTags 
        title="Daily Digest - Market Analysis"
        description="Expert financial analysis and market insights to inform your investment decisions"
        imageUrl="/api/og?title=Daily%20Digest&description=Market%20Analysis"
      />
      <App />
    </>
  );
}
