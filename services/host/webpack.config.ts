import path from 'path';
import webpack from 'webpack';
import { webpackConfig, BuildMode, BuildPaths } from '@packages/webpack-config';
import { dependencies } from './package.json';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  open?: boolean;
  LAYOUT_REMOTE_URL?: string;
  CONVERTER_REMOTE_URL?: string;
  NOTES_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {
  const LAYOUT_REMOTE_URL = env.LAYOUT_REMOTE_URL ?? 'http://localhost:3001';
  const CONVERTER_REMOTE_URL = env.CONVERTER_REMOTE_URL ?? 'http://localhost:3002';
  const NOTES_REMOTE_URL = env.NOTES_REMOTE_URL ?? 'http://localhost:3003';

  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
    env: path.resolve(__dirname, '.env.local'),
  };

  const config: webpack.Configuration = webpackConfig({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    open: env.open ?? true,
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        layout: `layout@${LAYOUT_REMOTE_URL}/remoteEntry.js`,
        converter: `converter@${CONVERTER_REMOTE_URL}/remoteEntry.js`,
        notes: `notes@${NOTES_REMOTE_URL}/remoteEntry.js`,
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          // requiredVersion: dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
          // requiredVersion: dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          // requiredVersion: dependencies['react-dom'],
        },
        'react-redux': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-redux'],
        },
      },
    }),
  );

  return config;
};
