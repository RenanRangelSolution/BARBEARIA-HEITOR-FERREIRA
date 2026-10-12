import React, { useState } from 'react';
import { Smartphone, Monitor, RotateCcw, Wifi, Battery, Signal, Sparkles } from 'lucide-react';

interface MobileSimulatorFrameProps {
  children: React.ReactNode;
  onExit: () => void;
}

export const MobileSimulatorFrame: React.FC<MobileSimulatorFrameProps> = ({
  children,
  onExit,
}) => {
  const [phoneModel, setPhoneModel] = useState<'iphone' | 'pixel'>('iphone');

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-start py-6 px-4">
      {/* Top Simulator Control Bar */}
      <div className="w-full max-w-xl mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Visualização Mobile</span>
              <span className="text-[10px] font-mono bg-neutral-800 text-amber-400 px-1.5 py-0.5 rounded">
                393 × 852 px
              </span>
            </div>
            <div className="text-[11px] text-neutral-400">
              Experiência idêntica ao smartphone do cliente
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Phone Model switcher */}
          <div className="flex bg-neutral-950 p-0.5 rounded-lg border border-neutral-800 text-xs">
            <button
              onClick={() => setPhoneModel('iphone')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                phoneModel === 'iphone'
                  ? 'bg-amber-600 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              iPhone
            </button>
            <button
              onClick={() => setPhoneModel('pixel')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                phoneModel === 'pixel'
                  ? 'bg-amber-600 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Android
            </button>
          </div>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-700 transition-colors cursor-pointer"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Ver Tela Cheia</span>
          </button>
        </div>
      </div>

      {/* The Physical Device Mockup */}
      <div className="relative">
        {/* Device Outer Chassis */}
        <div
          className={`relative ${
            phoneModel === 'iphone'
              ? 'w-[393px] h-[844px] rounded-[54px] border-[5px] border-neutral-700/80 shadow-amber-950/20'
              : 'w-[380px] h-[820px] rounded-[38px] border-[4px] border-neutral-800'
          } bg-neutral-900 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.9)] transition-all duration-300`}
        >
          {/* Hardware Side Buttons */}
          <div className="absolute -left-[9px] top-28 w-[4px] h-10 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -left-[9px] top-42 w-[4px] h-12 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -left-[9px] top-58 w-[4px] h-12 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -right-[9px] top-36 w-[4px] h-16 bg-neutral-700 rounded-r-sm" />

          {/* Screen Bezel & Container */}
          <div
            className={`relative w-full h-full bg-neutral-950 ${
              phoneModel === 'iphone' ? 'rounded-[42px]' : 'rounded-[28px]'
            } overflow-hidden flex flex-col border border-neutral-800/80`}
          >
            {/* Status Bar */}
            <div className="relative z-50 h-10 px-5 pt-2 flex items-center justify-between text-white text-xs font-semibold select-none bg-neutral-950/90 backdrop-blur-sm shrink-0">
              <span className="text-[12px] tabular-nums tracking-tight font-medium">
                {currentTime}
              </span>

              {/* Dynamic Island on iPhone or punch hole on Android */}
              {phoneModel === 'iphone' ? (
                <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end pr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto border border-neutral-800" />
              )}

              <div className="flex items-center gap-1.5 text-neutral-200">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-white" />
              </div>
            </div>

            {/* Scrollable Viewport inside the mobile */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth overscroll-contain no-scrollbar">
              {children}
            </div>

            {/* Gesture Navigation Indicator Bar */}
            <div className="h-5 bg-neutral-950 flex items-center justify-center shrink-0 z-50">
              <div
                className={`${
                  phoneModel === 'iphone' ? 'w-32 h-1 rounded-full' : 'w-24 h-1 rounded-full'
                } bg-neutral-600`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
