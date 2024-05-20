// PwaInstallPrompt.js
import React, { useEffect, useState } from 'react';
import { Button, Card } from '@nextui-org/react';

export const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log(e)
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the PWA prompt');
      } else {
        console.log('User dismissed the PWA prompt');
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isInstalled ? (
        <Card className="w-full max-w-md p-4 text-center bg-blue-50">
          <p className="text-lg font-medium text-blue-600">La app ya está instalada.</p>
          <Button
            auto
            onClick={() => window.location.replace(window.location.origin)}
            className="bg-blue-600 text-white mt-4"
          >
            Abrir la app
          </Button>
        </Card>
      ) : (
        <Card className="w-full max-w-md p-4 text-center bg-blue-50">
          <p className="text-lg font-medium text-blue-600 mb-4">La app no está instalada</p>
          <Button auto onClick={installApp} className="bg-blue-600 text-white">
            Instalar la app
          </Button>
        </Card>
      )}
    </div>
  );
};
