import { createSignal } from "solid-js";
import log from "loglevel";
import { useAuth } from "../providers/auth";

interface NetlinkInterface {
  name: string;
}

interface IInterfacesResponse {
  interfaces: [NetlinkInterface];
};

export default function SettingsPage() {
  const { apiHttpClient } = useAuth();
  const [interfaces, setInterfaces] = createSignal([]);

  const updateInterfaces = async () => {
    log.info("Attempting to fetch interfaces...");
    const response = await apiHttpClient.post("/net/interfaces");
    log.info("Fetched interfaces successfully");
    log.info(response);

    setInterfaces(response.data.interfaces)
  }

  updateInterfaces();
  return <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold tracking-tight">Settings</h2>
    </div>
    <div>
      <h3>Interfaces: {JSON.stringify(interfaces())}</h3>      
    </div>
  </div>
}
