import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Platform configuration and user management</p>
      </div>
      <div className="glass-panel rounded-lg p-8 text-center space-y-3">
        <SettingsIcon className="h-10 w-10 text-muted-foreground mx-auto" />
        <p className="text-sm text-muted-foreground">
          Settings will be available once authentication and Lovable Cloud are connected.
        </p>
      </div>
    </div>
  );
}
