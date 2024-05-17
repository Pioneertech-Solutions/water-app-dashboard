import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export const PeriodForm = ({ period, onChange, onSubmit, isSending }) => {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <select
          id="year"
          value={period.year}
          onChange={onChange}
          label="Año"
          className="h-10 rounded-lg px-3"
        >
          <option value="">Selecciona un año</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select
          id="month"
          value={period.month}
          onChange={onChange}
          label="Mes"
          className="h-10 rounded-lg px-3"
        >
          <option value="">Selecciona un mes</option>
          <option value="01">Enero</option>
          <option value="02">Febrero</option>
          <option value="03">Marzo</option>
          <option value="04">Abril</option>
          <option value="05">Mayo</option>
          <option value="06">Junio</option>
          <option value="07">Julio</option>
          <option value="08">Agosto</option>
          <option value="09">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <Button className="bg-blue-500" type="submit" disabled={isSending}>
        {isSending ? "Enviando..." : "Guardar"}
      </Button>
    </form>
  );
};

export const DeletePeriodModal = ({
  data,
  onSubmit,
  isSending,
  sendingSuccess,
  errorPeriod,
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (sendingSuccess && !isSending) {
      toast.success("Vecino registrado correctamente.");
      navigate(0);
    }
  }, [sendingSuccess, isSending]);

  useEffect(() => {
    if (errorPeriod) {
      const { response } = errorPeriod;
      if (!response) {
        toast.error("Error al registrar vecino.");
        return;
      }

      const { data } = response;
      if (!data.errors) {
        toast.error("Error al registrar vecino.");
        return;
      }

      const error = Object.values(data.errors)[0];
      toast.error(error);
    }
  }, [errorPeriod]);

  if (!data) return <>No</>;

  return (
    <>
      <Button onPress={onOpen} className="bg-white text-red-600" size="sm">
        <FaRegTrashAlt />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Eliminar periodo</ModalHeader>
              <form onSubmit={onSubmit}>
                <ModalBody>
                  <p>¿Estás seguro de que deseas eliminar este periodo?</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="button"
                    onPress={onClose}
                    className="bg-gray-500"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-red-500">
                    Eliminar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
