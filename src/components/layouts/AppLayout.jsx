import { Outlet } from "react-router-dom";
import { useAuth, useDark } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";
import { UserAvatarContainer } from "../../components/containers/userContainers";

export default function AppLayout() {
  const isOffline = false;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 relative">
      <header className="fixed top-0 left-0 z-[99999] w-full p-3">
        <Navbar />
        <Button className={`bg-gray-50 dark:bg-gray-700 text-sm font-bold w-fit mt-2 px-3 py-1 rounded-full shadow ${isOffline ? 'text-red-500': 'text-green-600'}`}>
          Modo {isOffline ? 'offline' : 'online'}
        </Button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const { dark, setDark } = useDark();
  const { logout } = useAuth();

  return (
    <nav className="w-full min-[600px]:w-[500px] sm:w-[450px] h-14 bg-gray-50 dark:bg-gray-700 shadow-lg flex items-center justify-center px-3 rounded-full">
      <div className="border-gray-300 h-12 w-full px-4 flex items-center justify-between rounded-full">
        <div className="flex">
          <button className="text-3xl text-gray-500 mr-5">
            <BsList />
          </button>
          <input
            type="text"
            className="bg-transparent outline-none w-full placeholder:text-gray-400"
            placeholder="Busca un lugar..."
            onClick={() => navigate("/search")}
          />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <button className="outline-none focus:outline-none">
              <UserAvatarContainer />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="show">Ver perfil</DropdownItem>
            <DropdownItem key="dark" onClick={() => setDark(!dark)}>
              Dark mode
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={logout}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};
