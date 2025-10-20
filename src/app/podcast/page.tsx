"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud } from "lucide-react";

export default function PodcastPage() {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    }
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Podcast Generator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>AI Model</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grok">Groq</SelectItem>
                      <SelectItem value="gpt-oss">GPT-OSS</SelectItem>
                      <SelectItem value="llama">Llama 3.1</SelectItem>
                      <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                      <SelectItem value="gemini">Gemini 1.5 Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Host A Voice</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US-AriaNeural">Aria (English, US)</SelectItem>
                        <SelectItem value="en-US-GuyNeural">Guy (English, US)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Host B Voice</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-GB-LibbyNeural">Libby (English, GB)</SelectItem>
                        <SelectItem value="en-GB-RyanNeural">Ryan (English, GB)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Podcast Mode</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upload Script</CardTitle>
              </CardHeader>
              <CardContent>
                <div {...getRootProps()} className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer">
                  <input {...getInputProps()} />
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">Drag &apos;n&apos; drop a script file here, or click to select a file.</p>
                </div>
                {files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold">Selected file:</h4>
                    <ul>
                      {files.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button className="w-full mt-4">Generate Podcast</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
