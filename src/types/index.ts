// VitalFlow Core TypeScript Data Models

export type BedStatus = 'ALL' | 'CRITICAL' | 'LOW' | 'NORMAL' | 'OFFLINE' | 'WAITING';

export interface BedData {
  id: string;
  bedNumber: string;
  patientName: string;
  patientId: string;
  percentage: number;
  volumeLeftMl: number;
  totalVolumeMl: number;
  estCompletion: string;
  status: BedStatus;
  lastSeenText: string;
  deviceId?: string;
  ward?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  bedNumber: string;
  department: string;
  status: 'stable' | 'warning' | 'critical';
  admissionDate: string;
}

export interface VitalSignAlert {
  id: string;
  patientId: string;
  type: 'heart_rate' | 'blood_pressure' | 'oxygen' | 'flow_rate' | 'temperature';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  read: boolean;
}

export interface FlowTelemetry {
  timestamp: string;
  flowRate: number; // L/min
  pressure: number; // mmHg
  volume: number;   // mL
}
