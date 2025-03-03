
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MetaTags from '../client/src/components/MetaTags';

export default function OgTest() {
  const router = useRouter();
  const { title, description } = router.query;
  
  const [ogSettings, setOgSettings] = useState({
    title: 'Daily Digest',
    description: 'Market insights and analysis',
  });
  
  useEffect(() => {
    if (title && typeof title === 'string') {
      setOgSettings(prev => ({ ...prev, title }));
    }
    if (description && typeof description === 'string') {
      setOgSettings(prev => ({ ...prev, description }));
    }
  }, [title, description]);
  
  return (
    <div className="container mx-auto p-8">
      <MetaTags 
        title={ogSettings.title}
        description={ogSettings.description}
      />
      
      <h1 className="text-3xl font-bold mb-6">OG Image Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Generated OG Image:</h2>
        <div className="border border-gray-300 rounded-md p-2">
          <img 
            src={`/api/og?title=${encodeURIComponent(ogSettings.title)}&description=${encodeURIComponent(ogSettings.description)}&v=${Date.now()}`}
            alt="Generated OG Image"
            className="w-full"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Customize OG Image:</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={ogSettings.title}
                onChange={(e) => setOgSettings(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={ogSettings.description}
                onChange={(e) => setOgSettings(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            <button
              onClick={() => {
                router.push({
                  pathname: router.pathname,
                  query: ogSettings
                }, undefined, { shallow: true });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update OG Image
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Share Links:</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page URL with OG Image:
              </label>
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Direct OG Image URL:
              </label>
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? 
                  `${window.location.origin}/api/og?title=${encodeURIComponent(ogSettings.title)}&description=${encodeURIComponent(ogSettings.description)}` : ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
