import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dni.app',
  appName: 'DNI',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
