import { AuthProvider } from "./contexts/AuthProvider";
import { DarkProvider } from "./contexts/DarkProvider";
import { Router } from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <DarkProvider>
        <Router />
      </DarkProvider>

      <div className="text-[.6rem] select-none fixed bottom-0 left-0 m-1 z-[999999999999] opacity-35">
        {import.meta.env.VITE_APP_VERSION || "v0.0.0"}
      </div>
    </AuthProvider>
  );
}

export default App;
