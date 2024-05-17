import { Button, Input, Skeleton } from "@nextui-org/react";
import { PhoneFormat } from "./formats";
import { useNavigate } from "react-router-dom";
import { H1 } from "./text";
import { useEffect, useState } from "react";
import { DeleteNeighborContainer } from "../containers/neighborContainers";
import toast from "react-hot-toast";

export const NeighborInfo = ({ neighbor, refetch }) => {
  const navigate = useNavigate();
  const [deleteView, setDeleteView] = useState(false);

  return (
    <div
      key={neighbor.uuid}
      className="w-full rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200 font-semibold bg-gray-100 dark:bg-gray-800 shadow"
    >
      <NeighborHeader neighbor={neighbor} />
      <div className="mt-3 grid gap-3 grid-cols-2">
        <Button
          color={deleteView ? "default" : "danger"}
          size="xs"
          onPress={() => setDeleteView(!deleteView)}
        >
          {deleteView ? "Cancelar" : "Eliminar"}
        </Button>
        <Button
          onPress={() => navigate(`/neighbors/${neighbor.uuid}/edit`)}
          className="bg-blue-500"
          size="xs"
        >
          Editar
        </Button>
      </div>

      {deleteView && (
        <DeleteNeighborContainer
          refetch={refetch}
          neighbor_uuid={neighbor.uuid}
        />
      )}
    </div>
  );
};

export function DeleteNeighbor({
  isSending,
  sendingSuccess,
  sendData,
  refetch_neighbors,
}) {
  useEffect(() => {
    if (sendingSuccess && !isSending) {
      toast.success("Vecino eliminado correctamente.");
      refetch_neighbors();
    }
  }, [sendingSuccess]);

  return (
    <div className="bg-gray-600 p-3 rounded-xl mt-5">
      <h2>¿Estás seguro de eliminar este vecino?</h2>
      <div className="mt-2">
        <Button
          onPress={() => sendData()}
          color="danger"
          disabled={isSending}
          className="w-full"
        >
          {isSending ? "Eliminando..." : "Eliminar"}
        </Button>
      </div>
    </div>
  );
}

const NeighborHeader = ({ neighbor }) => {
  return (
    <div className="flex items-center">
      <NeighborAvatar name={neighbor.fullname} />
      <div className="ml-3">
        <div className="text-lg font-semibold capitalize">
          {neighbor.fullname}
        </div>
        <div className="text-sm">
          <PhoneFormat phone={neighbor.phone_number || "Sin número"} />
        </div>
      </div>
    </div>
  );
};

const NeighborAvatar = ({ name }) => {
  return (
    <img
      className="h-10 w-10 rounded-full"
      src={`https://ui-avatars.com/api/?name=${name}&background=d7e6fc&color=4287f5&rounded=true`}
      alt="Avatar"
    />
  );
};

export const NeighborForm = ({ neighbor, onChange, onSubmit, isSending }) => {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          placeholder="Ingresa el nombre del vecino"
          value={neighbor.firstname}
          onChange={onChange}
          name="firstname"
          id="firstname"
          autoFocus
        />

        <Input
          label="Apellidos"
          placeholder="Ingresa los apellidos del vecino"
          value={neighbor.lastname}
          onChange={onChange}
          name="lastname"
          id="lastname"
        />
      </div>

      <Input
        label="Teléfono"
        placeholder="Ingresa el teléfono del vecino"
        value={neighbor.phone_number}
        onChange={onChange}
        name="phone_number"
        id="phone_number"
      />

      <Button className="bg-blue-500" type="submit" disabled={isSending}>
        {isSending ? "Enviando..." : "Guardar"}
      </Button>
    </form>
  );
};

export const EditNeighborPage = ({
  data: neighbor,
  isLoading,
  onChange,
  onSubmit,
  isSending,
  sendingSuccess,
  error: errorMessages,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sendingSuccess && !isSending) {
      toast.success("Vecino actualizado correctamente.");
      navigate(-1);
    }
  }, [sendingSuccess]);

  useEffect(() => {
    if (errorMessages) {
      if (!errorMessages.response) {
        toast.error("Error al registrar vecino.");
        return;
      }

      const { response } = errorMessages;
      if (!response.data.errors) {
        toast.error("Error al registrar vecino.");
        return;
      }

      const { data } = response;
      const error = Object.values(data.errors)[0];
      toast.error(error);
    }
  }, [errorMessages]);

  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!neighbor && !isLoading) return <div>Error al obtener los datos.</div>;

  return (
    <div>
      <NeighborHeader neighbor={neighbor} />
      <div className="mt-5">
        <H1 className="mb-5">Editar vecino</H1>
        <NeighborForm
          neighbor={neighbor}
          onChange={onChange}
          onSubmit={onSubmit}
          isSending={isSending}
        />
      </div>
    </div>
  );
};
