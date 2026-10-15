export type AnomalyOptionType = 'network' | 'resource' | 'disk'

export type AnomalyOptionConfig = {
  name: 'wifiHigh' | 'memory' | 'disc'
  text: string
  options: { value: string; label: string }[]
}

export const anomalyConfig: Record<AnomalyOptionType, AnomalyOptionConfig> = {
  network: {
    name: 'wifiHigh',
    text: 'Network / Connectivity',
    options: [
      { value: 'network_interface_disconnection', label: 'Network interface disconnection' },
      { value: 'ioc_service_restart', label: 'IOC service restart' },
      { value: 'full_server_reboot', label: 'Full server reboot' },
    ],
  },
  resource: {
    name: 'memory',
    text: 'Resource Consumption',
    options: [
      { value: 'progressive_memory_leak', label: 'Progressive memory leak' },
      { value: 'cpu_hog', label: 'CPU hog (CPU burn)' },
      { value: 'fork_bomb', label: 'Fork bomb / zombie processes' },
      { value: 'file_description_leak', label: 'File description leak' },
      { value: 'tcp_connection_saturation', label: 'TCP connection saturation' },
    ],
  },
  disk: {
    name: 'disc',
    text: 'Disk I/O',
    options: [
      { value: 'log_flooding', label: 'Log flooding (massive disk writes)' },
      { value: 'disk_fill', label: 'Disk fill' },
    ],
  },
}
