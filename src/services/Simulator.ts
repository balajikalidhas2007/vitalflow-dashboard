export interface TelemetryPayload {
  deviceId: string;
  bedId: string;
  weightKg: number;
  weightGrams: number;
  volumeMl: number;
  flowRateMlMin: number;
  timestamp: string;
}

/**
 * Utility to generate hardware-compliant telemetry payloads matching ESP32 + HX711 sensor outputs.
 */
export class TelemetrySimulator {
  static generatePayload(deviceId: string, bedId: string, currentVolumeMl: number, flowRateMlMin: number): TelemetryPayload {
    // 1 mL of aqueous IV solution ~ 1 g + 50g empty bag Tare weight
    const weightGrams = currentVolumeMl + 50;
    const weightKg = parseFloat((weightGrams / 1000).toFixed(3));

    return {
      deviceId,
      bedId,
      weightKg,
      weightGrams,
      volumeMl: currentVolumeMl,
      flowRateMlMin,
      timestamp: new Date().toISOString()
    };
  }

  static calculateEstEmptyTime(volumeMl: number, flowRateMlMin: number): string {
    if (volumeMl <= 0) return 'Depleted';
    if (flowRateMlMin <= 0) return 'Infusion Paused';

    const minutesRemaining = Math.round(volumeMl / flowRateMlMin);
    if (minutesRemaining < 60) {
      return `${minutesRemaining} mins`;
    }
    const hours = Math.floor(minutesRemaining / 60);
    const mins = minutesRemaining % 60;
    return `${hours}h ${mins < 10 ? '0' : ''}${mins}m`;
  }
}
