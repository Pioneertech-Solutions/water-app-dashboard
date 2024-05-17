import { errorsDictionary } from "../../config/errors";
import { Card, CardBody, Button } from "@nextui-org/react";

export default function ErrorLayout({ children, message }) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardBody className="bg-red-50">
          <p className="text-red-500">⚠️ {errorsDictionary[message]}</p>

          <Button onPress={handleReload} className="mt-4" color="danger" variant="faded">
            Volver a cargar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
