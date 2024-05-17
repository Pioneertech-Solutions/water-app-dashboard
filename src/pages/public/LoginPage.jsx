import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Button } from "@nextui-org/react";
import logoSrc from "../../assets/logo.webp";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      toast.error("Credenciales incorrectas", {
        'id': 'unique'
      });
    } finally {
      setLoading(false);
    }
  };

  // login page with tailwindcss and apple style using nextui
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-yellow-300">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-0">
        <div className="flex flex-col w-full max-w-sm space-y-8">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              className="w-20 h-20"
              src={logoSrc}
              alt="logo"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Iniciar sesión
            </h2>
            <p className="text-dark">
              Ingresa tus credenciales para acceder
            </p>
          </div>
          <form
            className="flex flex-col w-full space-y-6"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Ingresa tu correo electrónico..."
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Ingresa tu contraseña..."
              />
            </div>
            <div>
              <Button
                color="primary"
                type="submit"
                radius="full"
                className={`w-full ${loading ? "animate-pulse" : ""}`}
                isDisabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
