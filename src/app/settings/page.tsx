import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Settings</h1>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-api-key">OpenAI API Key</Label>
                <Input id="openai-api-key" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google-api-key">Google AI API Key</Label>
                <Input id="google-api-key" type="password" />
              </div>
              <Button>Save API Keys</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-adjust-workers">Auto Adjust Workers</Label>
                <Switch id="auto-adjust-workers" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-fallback">Enable Fallback</Label>
                <Switch id="enable-fallback" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cleanup-temp-files">Cleanup Temp Files</Label>
                <Switch id="cleanup-temp-files" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
