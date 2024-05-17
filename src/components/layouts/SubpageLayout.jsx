import { Container } from "../ui/layout";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { BiHome } from "react-icons/bi";

export default function SubpageLayout() {
  const navigate = useNavigate();

  return (
    <div
      className="pb-10"
    >
      <header className="py-3">
        <Container className="flex items-center justify-between">
          <Button
            type="button"
            className="text-2xl p-3 bg-gray-200 dark:bg-gray-700 rounded-xl"
            onPress={() => navigate(-1)}
          >
            <IoMdArrowBack />
          </Button>

          <Button
            type="button"
            className="text-2xl p-3 bg-gray-200 dark:bg-gray-700 rounded-xl"
            onPress={() => navigate('/')}
          >
            <BiHome />
          </Button>
        </Container>
      </header>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
