"use client";
import { useState, useEffect } from "react";

interface LiveCountdownProps {
  targetTime: string | null;
  className?: string;
}

export const LiveCountdown = ({ targetTime, className = "" }: LiveCountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!targetTime) {
      setSecondsLeft(null);
      return;
    }

    const update = () => {
      const diff = Math.floor((new Date(targetTime).getTime() - Date.now()) / 1000);
      setSecondsLeft(diff);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  if (secondsLeft === null) {
    return <span className={`text-muted-foreground ${className}`}>--</span>;
  }

  if (secondsLeft <= 0) {
    return (
      <span className={`font-bold text-status-smooth animate-pulse ${className}`}>
        Arr
      </span>
    );
  }

  if (secondsLeft < 60) {
    return (
      <span className={`font-bold text-status-smooth ${className}`}>
        {secondsLeft}s
      </span>
    );
  }

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  if (minutes < 10) {
    return (
      <span className={`font-mono tabular-nums ${className}`}>
        {minutes}:{secs.toString().padStart(2, "0")}
      </span>
    );
  }

  return (
    <span className={`tabular-nums ${className}`}>
      {minutes}<span className="text-muted-foreground text-[0.75em] ml-0.5">min</span>
    </span>
  );
};
