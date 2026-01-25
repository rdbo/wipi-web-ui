import { useNavigate } from "@solidjs/router";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../providers/auth";

export default function HomePage() {
  const { signOut, apiHttpClient } = useAuth();
  const checkAuth = async () => {
    apiHttpClient.post("/auth_status").then(() => {
      alert("Authentication status is OK");
    }, () => {
      alert("Authentication is bad");
    });
  }
  return <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <Card.Title class="text-sm font-medium text-gray-500 dark:text-gray-400">System Status</Card.Title>
        <Card.Body>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">Online</div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Uptime: 2 days 4 hours</p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Title class="text-sm font-medium text-gray-500 dark:text-gray-400">Network Usage</Card.Title>
        <Card.Body>
          <div class="text-2xl font-bold">1.2 GB</div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">↓ 45 Mbps ↑ 12 Mbps</p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Title class="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Devices</Card.Title>
        <Card.Body>
          <div class="text-2xl font-bold">5</div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">2 Active</p>
        </Card.Body>
      </Card>
    </div>
    <Card>
      <Card.Title>Quick Actions</Card.Title>
      <Card.Body class="flex flex-wrap gap-4">
        <Button onClick={checkAuth}>Check Auth Status</Button>
        <Button.Secondary onClick={signOut}>Sign Out</Button.Secondary>
      </Card.Body>
    </Card>
  </div>
}
