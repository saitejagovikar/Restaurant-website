import { useEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure nprogress
nprogress.configure({ 
  showSpinner: false,
  minimum: 0.1,
  speed: 200,
  easing: 'ease',
  trickleSpeed: 200
});

export const usePageLoader = () => {
  useEffect(() => {
    // Start progress bar when component mounts
    nprogress.start();
    
    // Complete progress bar after a short delay
    const timer = setTimeout(() => {
      nprogress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
      nprogress.done();
    };
  }, []);
};

export const startPageLoader = () => nprogress.start();
export const stopPageLoader = () => nprogress.done();
