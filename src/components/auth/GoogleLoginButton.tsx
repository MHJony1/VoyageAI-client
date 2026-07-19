'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface GoogleLoginButtonProps {
  onSuccess?: (idToken: string) => void;
  onError?: (error: Error) => void;
  isLoading?: boolean;
  text?: 'signin_with' | 'signup_with' | 'continue_with';
}

const GSI_SRC = 'https://accounts.google.com/gsi/client';
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function loadGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'));
    if ((window as any).google?.accounts?.id) return resolve();

    const existing = document.querySelector(`script[src="${GSI_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google script')));
      return;
    }

    const script = document.createElement('script');
    script.src = GSI_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google script'));
    document.head.appendChild(script);
  });
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
  isLoading = false,
  text = 'continue_with',
}: GoogleLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const handleCredential = useCallback(
    (response: { credential?: string }) => {
      if (response.credential) {
        onSuccess?.(response.credential);
      } else {
        const err = new Error('No credential returned from Google');
        toast.error(err.message);
        onError?.(err);
      }
    },
    [onSuccess, onError],
  );

  useEffect(() => {
    if (!CLIENT_ID) {
      toast.error('Google Client ID is not configured');
      return;
    }

    let cancelled = false;

    loadGsiScript()
      .then(() => {
        if (cancelled) return;
        const google = (window as any).google;
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredential,
        });
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          google.accounts.id.renderButton(containerRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text,
            width: 320,
            logo_alignment: 'center',
          });
        }
        setReady(true);
      })
      .catch((error) => {
        const err = error instanceof Error ? error : new Error('Google init failed');
        toast.error(err.message);
        onError?.(err);
      });

    return () => {
      cancelled = true;
    };
  }, [handleCredential, onError, text]);

  return (
    <div className="w-full flex justify-center">
      <div
        ref={containerRef}
        className={isLoading || !ready ? 'pointer-events-none opacity-60' : ''}
      />
    </div>
  );
}
