"use client";

import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface Voice {
  voice_id: string;
  language: string;
  region: string;
  gender: string;
  personality: string;
}

interface VoiceCardProps {
  voice: Voice;
}

export function VoiceCard({ voice }: VoiceCardProps) {
  return (
    <motion.div
      className="p-4 rounded-lg bg-secondary border border-border hover:border-accent cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{voice.voice_id.split("-").slice(2).join(" ").replace("Neural", "")}</h3>
        <button className="p-2 rounded-full bg-accent text-accent-foreground">
          <Play className="w-5 h-5" />
        </button>
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        <span>{voice.language} ({voice.region})</span> - <span>{voice.gender}</span>
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        <span>{voice.personality}</span>
      </div>
    </motion.div>
  );
}
