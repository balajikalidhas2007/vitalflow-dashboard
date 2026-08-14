import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  TrendingUp,
  Bell,
  LayoutGrid,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background glowing ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Label Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            WHAT VITALFLOW DOES
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Clinical Reality</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Every feature was designed around one question: what does a nurse actually need at 3am on a busy ward?
          </p>

          {/* Hero Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-95 group"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID (6 CARDS) */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/60 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Real-time Level Tracking</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              HX711 + load cell reads IV bag weight every 30 seconds. Volume, percentage, and status update live across every connected device — no manual checks needed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Predictive Depletion Engine</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our flow-rate algorithm computes consumption speed from historical readings and predicts the exact time the bag will empty — with high accuracy.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Priority Alert System</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Beds are automatically classified as Normal, Low Warning (&lt;30%), or Critical (&lt;15%). Critical beds glow and sort to the top of every nurse's dashboard.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Ward Overview</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              See every monitored bed at a glance. One screen gives the charge nurse a full situational picture — sorted by severity, filterable by status.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Role-Based Access</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Firebase Auth with Firestore role documents. Admins configure thresholds and manage devices. Nurses get a clean read-only ward view.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Low-Cost IoT Hardware</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Built on ESP32 microcontrollers and HX711 load cell amplifiers. Total hardware cost per bed is minimal, making hospital-wide rollout economically viable.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/60 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            THE SYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            From Sensor to Screen
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Four stages. Thirty seconds from reality to dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Vertical Step List */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-sm shadow-md">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  STEP 1: Weight Sensing
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  HX711 load cell amplifier continuously samples IV container mass with high precision.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-sm shadow-md">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  STEP 2: Wireless Transmission
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  ESP32 microcontroller transmits encrypted telemetry packets over Wi-Fi/MQTT every 30 seconds.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-sm shadow-md">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  STEP 3: Real-Time Processing
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The Depletion Engine calculates consumption rate deltas and estimates exact empty timestamps.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-sm shadow-md">
                04
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  STEP 4: Instant Dashboard Updates
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Firestore real-time listeners push telemetry status directly to nurse station displays and alerts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Stack */}
          <div className="space-y-6">
            {/* JSON Code Snippet Mockup */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping inline-block" />
                  TELEMETRY_PAYLOAD.json
                </span>
                <span className="text-cyan-400 font-semibold">ESP32-A1</span>
              </div>
              <pre className="text-xs font-mono text-cyan-300/90 leading-relaxed overflow-x-auto">
{`{
  "device_id": "ESP32-A1",
  "bed_id": "BED-01",
  "weight_g": 142.5,
  "volume_ml": 135,
  "flow_rate_ml_min": 4.2,
  "timestamp": "${new Date().toISOString()}"
}`}
              </pre>
            </div>

            {/* Depletion Engine Output Stats Box */}
            <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold uppercase">Depletion Engine Output</span>
                <span className="text-white font-bold text-base">Est. Depletion: <span className="text-red-400">32 mins</span></span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Burn Rate</span>
                <span className="text-cyan-400 font-semibold">4.2 mL/min</span>
              </div>
            </div>

            {/* Pulsing Critical Bed Preview Card */}
            <div className="glass-card p-5 rounded-2xl border border-red-500/40 bg-red-950/10 shadow-lg shadow-red-500/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 animate-pulse">
                    BED 01 - CRITICAL
                  </span>
                  <span className="text-xs text-slate-300 font-medium">Sarah C.</span>
                </div>
                <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
              </div>
              <div className="flex items-baseline justify-between text-xs text-slate-400">
                <span>Saline 0.9% (1000ml)</span>
                <span className="text-red-400 font-bold text-sm">13.5% (135 ml)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-red-500 h-full w-[13.5%] rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your Ward at a Glance
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Critical beds surface first. Every card shows volume, status, and predicted empty time — live, all the time.
          </p>
        </div>

        {/* Summary Stats Row Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Normal: 2
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            Low: 1
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            Critical: 1
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            Offline: 0
          </span>
        </div>

        {/* 4 Static Patient Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Patient 1: Sarah C. (Critical) */}
          <div className="glass-card p-5 rounded-2xl border border-red-500/40 bg-red-950/10 flex flex-col justify-between hover:border-red-500/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm flex items-center justify-center border border-slate-700">
                    01
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Sarah C.</h4>
                    <span className="text-[10px] text-slate-400 font-mono">ID: 994821</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 uppercase">
                  CRITICAL
                </span>
              </div>
              <div className="text-center py-4">
                <div className="text-3xl font-extrabold text-red-400">13.5%</div>
                <div className="text-[11px] text-slate-400">IV remaining</div>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>VOLUME LEFT</span>
                <span className="text-white font-semibold">135 ml</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EST. COMPLETION</span>
                <span className="text-red-400 font-bold">32 mins</span>
              </div>
            </div>
          </div>

          {/* Patient 2: Raj M. (Low Warning) */}
          <div className="glass-card p-5 rounded-2xl border border-amber-500/40 bg-amber-950/10 flex flex-col justify-between hover:border-amber-500/60 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm flex items-center justify-center border border-slate-700">
                    04
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Raj M.</h4>
                    <span className="text-[10px] text-slate-400 font-mono">ID: 883102</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                  LOW WARNING
                </span>
              </div>
              <div className="text-center py-4">
                <div className="text-3xl font-extrabold text-amber-400">26.0%</div>
                <div className="text-[11px] text-slate-400">IV remaining</div>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>VOLUME LEFT</span>
                <span className="text-white font-semibold">130 ml</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EST. COMPLETION</span>
                <span className="text-amber-400 font-bold">1h 02m</span>
              </div>
            </div>
          </div>

          {/* Patient 3: David L. (Normal) */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm flex items-center justify-center border border-slate-700">
                    02
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">David L.</h4>
                    <span className="text-[10px] text-slate-400 font-mono">ID: 772910</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  NORMAL
                </span>
              </div>
              <div className="text-center py-4">
                <div className="text-3xl font-extrabold text-emerald-400">72.0%</div>
                <div className="text-[11px] text-slate-400">IV remaining</div>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>VOLUME LEFT</span>
                <span className="text-white font-semibold">720 ml</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EST. COMPLETION</span>
                <span className="text-slate-300 font-semibold">3h 25m</span>
              </div>
            </div>
          </div>

          {/* Patient 4: Priya S. (Normal) */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-sm flex items-center justify-center border border-slate-700">
                    03
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Priya S.</h4>
                    <span className="text-[10px] text-slate-400 font-mono">ID: 554901</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  NORMAL
                </span>
              </div>
              <div className="text-center py-4">
                <div className="text-3xl font-extrabold text-emerald-400">82.0%</div>
                <div className="text-[11px] text-slate-400">IV remaining</div>
              </div>
            </div>
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>VOLUME LEFT</span>
                <span className="text-white font-semibold">410 ml</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>EST. COMPLETION</span>
                <span className="text-slate-300 font-semibold">3h 47m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-95 group"
          >
            <span>Open Live Dashboard</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
