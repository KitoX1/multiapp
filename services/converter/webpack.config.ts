import path from 'path';
import webpack from 'webpack';
import { webpackConfig, BuildMode, BuildPaths } from '@packages/webpack-config';

import packageJson from './package.json';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  open?: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
    env: path.resolve(__dirname, '.env.local'),
  };

  const config: webpack.Configuration = webpackConfig({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    open: env.open ?? false,
    paths,
  });

  config.plugins?.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'converter',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/app/router/Router.tsx',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
      },
    }),
  );

  return config;
};
