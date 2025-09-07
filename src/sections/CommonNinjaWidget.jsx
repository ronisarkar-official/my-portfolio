import { useEffect } from 'react';

export default function CommonNinjaWidget() {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.commoninja.com/sdk/latest/commonninja.js';
    script.defer = true;

    // Append script only if not already added
    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script);
    }
  }, []);

  return <div className="commonninja_component pid-fe6c3fa4-737e-4bd8-81cc-6032ebdebd7d"></div>;
}
