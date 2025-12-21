import { useNavigate } from "@solidjs/router";
import Button from "../components/ui/Button";
import { useAuth } from "../providers/auth";
import axios from "axios";

export default function HomePage() {
  const { signOut, authToken } = useAuth();
  const checkAuth = async () => {
    axios.post("/api/auth_status").then(() => {
      alert("Authentication status is OK");
    }, () => {
      alert("Authentication is bad");
    });
  }
  return <>
    <h1>Home Page</h1>
    <div>
      <div>Session: {authToken()}</div>
      <Button class="mx-2" onClick={checkAuth}>Check Auth</Button>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  </>
}
