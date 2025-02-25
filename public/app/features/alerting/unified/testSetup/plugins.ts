import { RequestHandler } from 'msw';

import { PluginMeta, PluginType } from '@grafana/data';
import { config, setPluginExtensionsHook } from '@grafana/runtime';

import { mockPluginLinkExtension } from '../mocks';
import { getPluginsHandler } from '../mocks/server/handlers/plugins';

export function setupPlugins(plugins: PluginMeta[]): { apiHandlers: RequestHandler[] } {
  plugins.forEach((plugin) => {
    config.apps[plugin.id] = {
      id: plugin.id,
      path: plugin.baseUrl,
      preload: true,
      version: plugin.info.version,
      angular: plugin.angular ?? { detected: false, hideDeprecation: false },
    };
  });

  return {
    apiHandlers: [getPluginsHandler(plugins)],
  };
}

export function setupPluginsExtensionsHook() {
  setPluginExtensionsHook(() => ({
    extensions: plugins.map((plugin) =>
      mockPluginLinkExtension({
        pluginId: plugin.id,
        title: plugin.name,
        path: `/a/${plugin.id}`,
      })
    ),
    isLoading: false,
  }));
}

export const plugins: PluginMeta[] = [
  {
    id: 'grafana-slo-app',
    name: 'SLO dashboard',
    type: PluginType.app,
    enabled: true,
    info: {
      author: {
        name: 'Grafana Labs',
        url: '',
      },
      description: 'Create and manage Service Level Objectives',
      links: [],
      logos: {
        small: 'public/plugins/grafana-slo-app/img/logo.svg',
        large: 'public/plugins/grafana-slo-app/img/logo.svg',
      },
      screenshots: [],
      version: 'local-dev',
      updated: '2024-04-09',
    },
    module: 'public/plugins/grafana-slo-app/module.js',
    baseUrl: 'public/plugins/grafana-slo-app',
  },
  {
    id: 'grafana-incident-app',
    name: 'Incident management',
    type: PluginType.app,
    enabled: true,
    info: {
      author: {
        name: 'Grafana Labs',
        url: '',
      },
      description: 'Incident management',
      links: [],
      logos: {
        small: 'public/plugins/grafana-incident-app/img/logo.svg',
        large: 'public/plugins/grafana-incident-app/img/logo.svg',
      },
      screenshots: [],
      version: 'local-dev',
      updated: '2024-04-09',
    },
    module: 'public/plugins/grafana-incident-app/module.js',
    baseUrl: 'public/plugins/grafana-incident-app',
  },
  {
    id: 'grafana-asserts-app',
    name: 'Asserts',
    type: PluginType.app,
    enabled: true,
    info: {
      author: {
        name: 'Grafana Labs',
        url: '',
      },
      description: 'Asserts',
      links: [],
      logos: {
        small: 'public/plugins/grafana-asserts-app/img/logo.svg',
        large: 'public/plugins/grafana-asserts-app/img/logo.svg',
      },
      screenshots: [],
      version: 'local-dev',
      updated: '2024-04-09',
    },
    module: 'public/plugins/grafana-asserts-app/module.js',
    baseUrl: 'public/plugins/grafana-asserts-app',
  },
  {
    id: 'grafana-oncall-app',
    name: 'OnCall',
    type: PluginType.app,
    enabled: true,
    info: {
      author: {
        name: 'Grafana Labs',
        url: '',
      },
      description: 'OnCall',
      links: [],
      logos: {
        small: '',
        large: '',
      },
      screenshots: [],
      version: 'local-dev',
      updated: '2024-04-09',
    },
    module: 'public/plugins/grafana-oncall-app/module.js',
    baseUrl: 'public/plugins/grafana-oncall-app',
  },
];
