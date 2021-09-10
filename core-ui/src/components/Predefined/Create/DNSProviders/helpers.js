import * as jp from 'jsonpath';

export function dnsProviderToYaml(dnsProvider) {
  return {
    apiVersion: 'dns.gardener.cloud/v1alpha1',
    kind: 'DNSProvider',
    metadata: {
      name: dnsProvider.name,
      namespace: dnsProvider.namespace,
      labels: dnsProvider.labels,
      annotations: dnsProvider.annotations,
    },
    spec: {
      domains: {
        include: dnsProvider.domains?.include?.filter(d => d) || [],
        exclude: dnsProvider.domains?.exclude?.filter(d => d) || [],
      },
      secretRef: dnsProvider.secretRef,
      defaultTTL: dnsProvider.defaultTTL,
      type: dnsProvider.type,
    },
  };
}

export function yamlToDNSProvider(yaml) {
  return {
    name: jp.value(yaml, '$.metadata.name') || '',
    namespace: jp.value(yaml, '$.metadata.namespace') || '',
    labels: jp.value(yaml, '$.metadata.labels') || {},
    annotations: jp.value(yaml, '$.metadata.annotations') || {},
    domains: jp.value(yaml, '$.spec.domains') || '',
    secretRef: jp.value(yaml, '$.spec.secretRef') || {
      name: '',
      namespace: '',
    },
    defaultTTL: jp.value(yaml, '$.spec.defaultTTL') || 600,
    type: jp.value(yaml, '$.spec.type') || '',
  };
}

export function createDNSProviderTemplate(namespaceId) {
  return {
    name: '',
    namespace: namespaceId,
    labels: {},
    annotations: {},
    domains: {
      include: [],
      exclude: [],
    },
    defaultTTL: 600,
    secretRef: { name: '', namespace: namespaceId },
    type: '',
  };
}