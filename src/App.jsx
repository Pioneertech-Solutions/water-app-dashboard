import { app_version } from "./config/server";
import { AuthProvider } from "./contexts/AuthProvider";
import { DarkProvider } from "./contexts/DarkProvider";
import { Router } from "./routes/router";

function App() {
  return (
    <>
      <AuthProvider>
        <DarkProvider>
          <Router />
        </DarkProvider>
      </AuthProvider>

      <div className="text-[.6rem] select-none fixed bottom-0 left-0 m-1 z-[999999999999] opacity-35 text-gray-400">
        {app_version || "v0.0.0"}
      </div>
    </>
  );
}

export default App;
