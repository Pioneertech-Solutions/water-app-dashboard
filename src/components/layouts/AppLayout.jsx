import {Outlet, useLocation} from "react-router-dom";
import { useAuth, useDark } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { UserAvatarContainer } from "../../components/containers/userContainers";
import {SearchNeighborContainer} from "../containers/neighborContainers.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 relative">
      <header className="fixed top-0 left-0 z-[99999] w-full px-3 py-2">
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="w-full min-[600px]:w-[500px] sm:w-[450px] h-14 bg-gray-50 dark:bg-gray-700 shadow-lg flex items-center justify-center px-3 rounded-full">
      <div className="border-gray-300 h-12 w-full px-4 flex items-center justify-between rounded-full">
        <div className="flex">
          <Dropdown>
            <DropdownTrigger>
              <button className="outline-none focus:outline-none">
                <UserAvatarContainer />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
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

          <SearchNeighborContainer />
        </div>

        {location.pathname !== '/search' ? (
          <button className="text-3xl text-gray-500 ml-3">
            <BsList/>
          </button>
        ) : (
          <button className="text-3xl text-gray-500 ml-3" onClick={() => navigate(-1)}>
            <BsList/>
          </button>
        )}
      </div>
    </nav>
  );
};
