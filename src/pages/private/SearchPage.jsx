import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 z-[99999] w-full p-3">
        <nav className="w-full h-14 bg-gray-50 dark:bg-gray-700 shadow-lg flex items-center justify-center px-3 rounded-full">
          <div className="border-gray-300 h-12 w-full px-4 flex items-center justify-between rounded-full">
            <div className="flex w-full">
              <button
                type="button"
                className="text-4xl text-gray-500 mr-5"
                onClick={() => navigate("/")}
              >
                <BsArrowLeftShort />
              </button>
              <input
                type="text"
                className="bg-transparent outline-none w-full placeholder:text-gray-400"
                placeholder="Busca un lugar..."
                autoFocus
              />
              <button type="submit" className="text-2xl text-gray-500">
                <BsSearch />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main></main>
    </>
  );
}
