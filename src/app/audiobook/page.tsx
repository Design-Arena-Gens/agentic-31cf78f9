"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { UploadCloud } from "lucide-react";

export default function AudiobookPage() {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/epub+zip': ['.epub'],
    }
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Audiobook Generator</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Voice</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US-AriaNeural">Aria (English, US)</SelectItem>
                      <SelectItem value="en-GB-LibbyNeural">Libby (English, GB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Rate</Label>
                  <Slider defaultValue={[0]} min={-50} max={50} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>Pitch</Label>
                  <Slider defaultValue={[0]} min={-50} max={50} step={1} />
                </div>
                <div className="space-y-2">
                  <Label>Volume</Label>
                  <Slider defaultValue={[0]} min={-50} max={50} step={1} />
                </div>
                <div className="flex items-center space-x-2">
                  <Toggle>SSML</Toggle>
                  <Label>Use SSML</Label>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div {...getRootProps()} className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer">
                  <input {...getInputProps()} />
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">Drag &apos;n&apos; drop a PDF or EPUB file here, or click to select a file.</p>
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
                <Button className="w-full mt-4">Generate Audiobook</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
