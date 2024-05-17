import { AuthProvider } from "./contexts/AuthProvider";
import { DarkProvider } from "./contexts/DarkProvider";
import { Router } from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <DarkProvider>
        <Router />
      </DarkProvider>
    </AuthProvider>
  );
}

export default App;
