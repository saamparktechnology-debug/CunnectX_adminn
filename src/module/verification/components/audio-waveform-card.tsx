"use client";

import React from "react";
import { Play, Pause, RotateCcw, FastForward, Volume2 } from "lucide-react";
import { useAudioPlayer } from "../hooks/use-audio-player";
import { formatSecondsToTime } from "@/lib/utils";

interface AudioWaveformCardProps {
  voiceUrl: string;
  durationSec: number;
}

export function AudioWaveformCard({
  voiceUrl,
  durationSec,
}: AudioWaveformCardProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    togglePlay,
    seek,
    changeSpeed,
  } = useAudioPlayer(voiceUrl);

  const effectiveDuration = duration || durationSec;
  const progressPercent = effectiveDuration
    ? (currentTime / effectiveDuration) * 100
    : 0;

  // Mock visually aesthetic synthetic audio bars based on waveform index
  const barHeights = [
    40, 65, 85, 30, 45, 95, 75, 60, 40, 80, 100, 65, 50, 85, 90, 45, 70, 55, 35,
    60, 80, 95, 40, 25,
  ];

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-inner">
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
        <span className="flex items-center gap-1.5 text-neutral-300">
          <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> High-Fidelity
          Recording
        </span>
        <span>
          {formatSecondsToTime(currentTime)} /{" "}
          {formatSecondsToTime(effectiveDuration)}
        </span>
      </div>

      {/* Waveform Scrubber Surface */}
      <div
        className="relative h-12 w-full flex items-center gap-[3px] cursor-pointer group px-1"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          seek((clickX / rect.width) * 100);
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        tabIndex={0}
      >
        {barHeights.map((h, i) => {
          const barPercent = (i / barHeights.length) * 100;
          const isPassed = progressPercent >= barPercent;
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-150 ${
                isPassed
                  ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  : "bg-neutral-700 group-hover:bg-neutral-600"
              }`}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>

      {/* Playback Controls & Speed Toggle */}
      <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-800/80">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition-all"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => seek(0)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors"
            title="Restart playback"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-neutral-950/80 p-1 rounded-lg border border-neutral-800 text-xs">
          {[1, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => changeSpeed(speed)}
              className={`px-2 py-0.5 rounded font-mono font-medium transition-colors ${
                playbackRate === speed
                  ? "bg-indigo-600 text-white"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
