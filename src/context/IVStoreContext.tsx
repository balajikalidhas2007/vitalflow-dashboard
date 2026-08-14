import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { BedData } from '../types';
import { TelemetrySimulator } from '../services/Simulator';

export interface AlertItem {
  id: string;
  bedNumber: string;
  patientName: string;
  patientId: string;
  type: 'CRITICAL' | 'LOW';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  details: string;
  category: 'SYSTEM' | 'DEVICE' | 'ALERT' | 'CALIBRATION' | 'USER';
  timestamp: string;
}

export interface SystemSettings {
  offlineTimeoutSec: number;
  criticalThreshold: number;
  lowThreshold: number;
  autoSortingEnabled: boolean;
  smsNotificationsEnabled: boolean;
  wiFiHeartbeatSec: number;
}

interface IVStoreContextType {
  beds: BedData[];
  alerts: AlertItem[];
  auditLogs: AuditLogItem[];
  settings: SystemSettings;
  isSimulatorRunning: boolean;
  toggleSimulator: () => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  addBed: (newBed: BedData) => void;
  acknowledgeAlert: (alertId: string) => void;
  clearAlerts: () => void;
  addAuditLog: (action: string, details: string, category?: AuditLogItem['category'], actor?: string) => void;
}

const DEFAULT_SETTINGS: SystemSettings = {
  offlineTimeoutSec: 60,
  criticalThreshold: 15,
  lowThreshold: 30,
  autoSortingEnabled: true,
  smsNotificationsEnabled: true,
  wiFiHeartbeatSec: 30,
};

const INITIAL_BEDS: BedData[] = [
  {
    id: 'bed-13',
    bedNumber: '13',
    patientName: 'A',
    patientId: '123546',
    percentage: 0,
    volumeLeftMl: 0,
    totalVolumeMl: 500,
    estCompletion: 'N/A',
    status: 'OFFLINE',
    lastSeenText: 'Device offline 80d ago',
    deviceId: 'ESP32-OFFLINE',
    ward: 'General Ward A'
  },
  {
    id: 'bed-01',
    bedNumber: '01',
    patientName: 'Sarah C.',
    patientId: '994821',
    percentage: 14.0,
    volumeLeftMl: 140,
    totalVolumeMl: 1000,
    estCompletion: '32 mins',
    status: 'CRITICAL',
    lastSeenText: 'Telemetry active',
    deviceId: 'ESP32-A1',
    ward: 'General Ward A'
  },
  {
    id: 'bed-04',
    bedNumber: '04',
    patientName: 'Raj M.',
    patientId: '883102',
    percentage: 26.0,
    volumeLeftMl: 130,
    totalVolumeMl: 500,
    estCompletion: '1h 02m',
    status: 'LOW',
    lastSeenText: 'Telemetry active',
    deviceId: 'ESP32-A4',
    ward: 'General Ward A'
  },
  {
    id: 'bed-02',
    bedNumber: '02',
    patientName: 'David L.',
    patientId: '772910',
    percentage: 72.0,
    volumeLeftMl: 720,
    totalVolumeMl: 1000,
    estCompletion: '3h 25m',
    status: 'NORMAL',
    lastSeenText: 'Telemetry active',
    deviceId: 'ESP32-A2',
    ward: 'General Ward A'
  }
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    actor: 'System',
    action: 'Telemetry Simulator Initialized',
    details: 'ESP32 sensors listening on MQTT ward stream',
    category: 'SYSTEM',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
  },
  {
    id: 'log-2',
    actor: 'Nurse Admin',
    action: 'Bed Registered',
    details: 'Assigned ESP32-A1 to Bed 01 (Patient: Sarah C.)',
    category: 'DEVICE',
    timestamp: new Date(Date.now() - 2400000).toLocaleTimeString()
  },
  {
    id: 'log-3',
    actor: 'Depletion Engine',
    action: 'Critical Threshold Triggered',
    details: 'Bed 01 IV volume dropped below 15% (140 mL remaining)',
    category: 'ALERT',
    timestamp: new Date(Date.now() - 1200000).toLocaleTimeString()
  }
];

const IVStoreContext = createContext<IVStoreContextType | undefined>(undefined);

export const IVStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [beds, setBeds] = useState<BedData[]>(INITIAL_BEDS);
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'alert-1',
      bedNumber: '01',
      patientName: 'Sarah C.',
      patientId: '994821',
      type: 'CRITICAL',
      message: 'IV fluid level critical (14.0% / 140ml remaining). Predicted empty in 32 mins.',
      timestamp: new Date(Date.now() - 600000).toLocaleTimeString(),
      acknowledged: false
    }
  ]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState<boolean>(true);

  const addAuditLog = useCallback((action: string, details: string, category: AuditLogItem['category'] = 'SYSTEM', actor = 'System') => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actor,
      action,
      details,
      category,
      timestamp: new Date().toLocaleTimeString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, []);

  const toggleSimulator = () => {
    setIsSimulatorRunning((prev) => {
      const nextState = !prev;
      addAuditLog(
        nextState ? 'Simulator Resumed' : 'Simulator Paused',
        `Live telemetry telemetry stream ${nextState ? 'active' : 'paused'}`,
        'SYSTEM',
        'Nurse Admin'
      );
      return nextState;
    });
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      addAuditLog(
        'System Thresholds Updated',
        `Critical: ${updated.criticalThreshold}%, Low: ${updated.lowThreshold}%, Offline: ${updated.offlineTimeoutSec}s`,
        'SYSTEM',
        'Nurse Admin'
      );
      return updated;
    });
  };

  const addBed = (newBed: BedData) => {
    setBeds((prev) => [newBed, ...prev]);
    addAuditLog(
      'Device Registered',
      `Mapped ${newBed.deviceId || 'ESP32'} to Bed ${newBed.bedNumber} (${newBed.patientName})`,
      'DEVICE',
      'Nurse Admin'
    );
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    addAuditLog('Alert Acknowledged', `Alert ${alertId} acknowledged by staff`, 'ALERT', 'Nurse Admin');
  };

  const clearAlerts = () => {
    setAlerts([]);
    addAuditLog('Alerts Cleared', 'All active clinical alerts marked as resolved', 'ALERT', 'Nurse Admin');
  };

  // Simulator interval tick effect
  useEffect(() => {
    if (!isSimulatorRunning) return;

    const interval = setInterval(() => {
      setBeds((prevBeds) =>
        prevBeds.map((bed) => {
          if (bed.status === 'OFFLINE' || bed.volumeLeftMl <= 0) return bed;

          // Consume 2 mL per tick (~4 mL/min)
          const newVolume = Math.max(0, bed.volumeLeftMl - 2);
          const newPercentage = parseFloat(((newVolume / bed.totalVolumeMl) * 100).toFixed(1));
          const flowRate = 4.2;

          // Determine status based on current settings
          let newStatus: BedData['status'] = 'NORMAL';
          if (newPercentage <= settings.criticalThreshold) {
            newStatus = 'CRITICAL';
          } else if (newPercentage <= settings.lowThreshold) {
            newStatus = 'LOW';
          }

          // Trigger alert if status converted to Critical or Low and alert not logged yet
          if (newStatus === 'CRITICAL' && bed.status !== 'CRITICAL') {
            setAlerts((existing) => [
              {
                id: `alert-${Date.now()}`,
                bedNumber: bed.bedNumber,
                patientName: bed.patientName,
                patientId: bed.patientId,
                type: 'CRITICAL',
                message: `IV bag critical at ${newPercentage}% (${newVolume}ml left).`,
                timestamp: new Date().toLocaleTimeString(),
                acknowledged: false
              },
              ...existing
            ]);
            addAuditLog(
              'Critical Alert Triggered',
              `Bed ${bed.bedNumber} reached ${newPercentage}% IV volume`,
              'ALERT'
            );
          }

          return {
            ...bed,
            volumeLeftMl: newVolume,
            percentage: newPercentage,
            estCompletion: TelemetrySimulator.calculateEstEmptyTime(newVolume, flowRate),
            status: newStatus,
            lastSeenText: 'Just now'
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulatorRunning, settings, addAuditLog]);

  return (
    <IVStoreContext.Provider
      value={{
        beds,
        alerts,
        auditLogs,
        settings,
        isSimulatorRunning,
        toggleSimulator,
        updateSettings,
        addBed,
        acknowledgeAlert,
        clearAlerts,
        addAuditLog
      }}
    >
      {children}
    </IVStoreContext.Provider>
  );
};

export const useIVStore = () => {
  const context = useContext(IVStoreContext);
  if (!context) {
    throw new Error('useIVStore must be used within an IVStoreProvider');
  }
  return context;
};
