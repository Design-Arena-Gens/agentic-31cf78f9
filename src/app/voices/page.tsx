"use client";

import { useState } from "react";
import { voices } from "@/lib/voices";
import { VoiceCard } from "@/components/voice-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/sidebar";

export default function VoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    language: "all",
    gender: "all",
  });

  const filteredVoices = voices
    .filter((voice) =>
      voice.voice_id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (voice) =>
        filters.language === "all" || voice.language === filters.language
    )
    .filter(
      (voice) => filters.gender === "all" || voice.gender === filters.gender
    );

  const languages = [...new Set(voices.map((v) => v.language))];
  const genders = [...new Set(voices.map((v) => v.gender))];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Voice Library</h1>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Search voices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select
            onValueChange={(value) => setFilters({ ...filters, language: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setFilters({ ...filters, gender: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              {genders.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVoices.map((voice) => (
            <VoiceCard key={voice.voice_id} voice={voice} />
          ))}
        </div>
      </main>
    </div>
  );
}
