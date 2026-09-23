import { AnomalyOptionType } from '../components/Molecules/AnomalyOption'

export interface AnomalyOptionHeaderData {
  title: string
  description: string
}

type AnomalyHeaderMap = Record<
  AnomalyOptionType,
  Record<string, AnomalyOptionHeaderData>
>

export const anomalyHeaderConfig: AnomalyHeaderMap = {
  network: {
    network_interface_disconnection: {
      title: 'Network interface disconnection',
      description:
        'The network interface has unexpectedly disconnected. Review the interface status and check for cable faults or driver issues.',
    },
    ioc_service_restart: {
      title: 'IOC service restart',
      description:
        'The IOC (Input/Output Controller) service has been restarted. This may cause temporary data acquisition interruptions.',
    },
    full_server_reboot: {
      title: 'Full server reboot',
      description:
        'A complete server reboot has been detected. Check system logs for hardware failures or kernel panics.',
    },
  },
  resource: {
    progressive_memory_leak: {
      title: 'Progressive memory leak',
      description:
        'Memory consumption is steadily increasing without being released. Identify the process responsible and monitor for potential OOM conditions.',
    },
    cpu_hog: {
      title: 'CPU hog (CPU burn)',
      description:
        'A process is consuming excessive CPU resources. Review top processes and consider throttling or restarting the affected service.',
    },
    fork_bomb: {
      title: 'Fork bomb / zombie processes',
      description:
        'Rapid process creation detected, potentially exhausting available PIDs. Immediate intervention may be required.',
    },
    file_description_leak: {
      title: 'File descriptor leak',
      description:
        'Open file descriptors are increasing without being closed. This may lead to service unavailability when the system limit is reached.',
    },
    tcp_connection_saturation: {
      title: 'TCP connection saturation',
      description:
        'The system has reached or is approaching its maximum TCP connection limit. Review connection pooling and timeout configurations.',
    },
  },
  disk: {
    log_flooding: {
      title: 'Log flooding (massive disk writes)',
      description:
        'An abnormal volume of disk write operations has been detected, likely caused by excessive logging. Review log levels and rotation policies.',
    },
    disk_fill: {
      title: 'Disk fill',
      description:
        'Available disk space is rapidly decreasing. Identify the cause of excessive data accumulation and free space to avoid service disruption.',
    },
  },
}

export function getAnomalyHeader(
  type: AnomalyOptionType,
  optionValue: string
): AnomalyOptionHeaderData {
  return (
    anomalyHeaderConfig[type][optionValue] ?? {
      title: 'Unknown anomaly',
      description: 'No additional information available for this anomaly.',
    }
  )
}
