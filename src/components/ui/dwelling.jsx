import {
  Skeleton,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import inhabitedSrc from "../../assets/images/inhabited.png";
import contributionSrc from "../../assets/images/contribution.png";
import dwellingSrc from "../../assets/images/dwelling.png";
import {
  ContributionsContainer,
  InhabitedContainer,
  LastContributionContainer,
  NeighborsContainer,
  PendingPeriodsContainer,
} from "../containers/dwellingContainers";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { H1, H2 } from "./text";
import { MoneyFormat } from "./formats";
import { NeighborForm, NeighborInfo } from "./neighbor";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { PeriodForm } from "./period";
import { DeletePeriodModalContainer } from "../containers/periodContainers";
import { IoIosSettings } from "react-icons/io";

export const DwellingCard = ({ data: dwelling, isLoading }) => {
  const navigate = useNavigate();
  if (isLoading)
    return (
      <Skeleton className="h-56 w-full rounded-3xl bg-gray-50 dark:bg-gray-700" />
    );
  if (!dwelling) return <div>Error al obtener los datos.</div>;

  return (
    <motion.div
      className="h-56 bg-gray-50 dark:bg-gray-700 shadow-lg rounded-3xl relative px-4 py-2"
      initial={{ scale: 0.7, translateY: 30 }}
      animate={{ scale: [1.05, 1], translateY: 0 }}
    >
      <DwellingHeader dwelling={dwelling} />

      <div className="grid grid-rows-2 gap-4">
        <DwellingStatus dwelling={dwelling} />

        <div className="grid gap-3 grid-cols-2">
          <Button
            onPress={() => navigate(`/dwellings/${dwelling.uuid}`)}
            color="default"
            className="bg-gray-300 dark:bg-gray-600"
          >
            Ver información
          </Button>
          <ActionButton neighbors_count={dwelling.neighbors_count} />
        </div>
      </div>
    </motion.div>
  );
};

const DwellingHeader = ({ dwelling }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <div
            className="w-10 h-10 block rounded-full"
            style={{
              backgroundColor: dwelling.type_color,
            }}
          ></div>
        </div>
        <div className="mx-3">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 capitalize">
            {dwelling.title}
          </p>
          <div className="text-xs text-gray-400 capitalize">
            <LastContributionContainer dwelling_uuid={dwelling.uuid} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DwellingStatus = ({ dwelling }) => {
  return (
    <div className="mt-3 grid gap-3 grid-cols-3">
      <ContributionsStatus
        status_color={dwelling.status_color}
        status_description={dwelling.status_description}
        pending_periods={dwelling.pending_periods}
      />
      <TypeDwelling
        type_color={dwelling.type_color}
        type_name={dwelling.type_name}
      />
      <InhabitedContainer
        dwelling_uuid={dwelling.uuid}
        inhabited={dwelling.inhabited}
      />
    </div>
  );
};

const ActionButton = ({ neighbors_count }) => {
  return (
    <Button color="primary" className="bg-blue-600">
      Registrar {neighbors_count > 0 ? "contribución" : "vecino"}
    </Button>
  );
};

export const InhabitedButton = ({ onClick, data, isLoading, error }) => {
  if (isLoading) return <Skeleton className="h-10 w-20 rounded-xl" />;
  if (data === null || error) return <div>Error al obtener los datos.</div>;

  return (
    <motion.button
      whileTap={{
        scale: 0.65,
      }}
      disabled={isLoading}
      onClick={onClick}
      className={`${
        data ? "bg-sky-500" : "bg-gray-800"
      } w-full h-full rounded-xl p-2 text-white font-semibold text-xs text-center flex items-center justify-center`}
    >
      <div>
        <img
          src={inhabitedSrc}
          alt="image"
          className="w-10 mx-auto mb-1 invert"
        />
        <div>{data ? "Habitada" : "Desocupada"}</div>
      </div>
    </motion.button>
  );
};

const ContributionsStatus = ({
  status_color,
  status_description,
  pending_periods,
}) => {
  return (
    <div
      className={`w-full h-full rounded-xl p-2 font-semibold text-xs text-center ${
        pending_periods > 2 ? "text-white" : "text-dark"
      }`}
      style={{
        backgroundColor: status_color,
      }}
    >
      <img src={contributionSrc} alt="image" className="w-10 mx-auto mb-1" />
      <div>{status_description}</div>
    </div>
  );
};

const TypeDwelling = ({ type_color, type_name }) => {
  return (
    <div
      className="w-full h-full rounded-xl p-2 font-semibold text-xs text-center text-dark"
      style={{
        backgroundColor: type_color,
      }}
    >
      <img src={dwellingSrc} alt="image" className="w-10 mx-auto mb-1" />
      <div>{type_name}</div>
    </div>
  );
};

export function LastContribution({ data, isLoading, error }) {
  if (isLoading)
    return (
      <Skeleton className="h-5 w-full rounded-xl bg-gray-300 dark:bg-gray-600" />
    );
  if (!data && error) return <div>No hay pagos registrados.</div>;

  return `Última contribución: ${data?.message}`;
}

export function DwellingPage({ data: dwelling, isLoading }) {
  const navigate = useNavigate();
  if (isLoading) return <Skeleton className="h-12 w-full rounded-3xl" />;
  if (!dwelling) return <div>Error al obtener los datos.</div>;

  return (
    <div>
      <DwellingHeader dwelling={dwelling} />

      <div className="grid grid-cols-2 gap-3 mt-3">
        <Button
          onPress={() =>
            navigate(`/dwellings/${dwelling.uuid}/register-neighbor`)
          }
        >
          Registrar vecino
        </Button>
        <Button
          onPress={() =>
            navigate(`/dwellings/${dwelling.uuid}/register-contribution`)
          }
          className="bg-blue-500"
        >
          Registrar contribución
        </Button>
      </div>
      <div className="mt-5">
        <H2 className="mb-3">Estatus de la vivienda</H2>
        <DwellingStatus dwelling={dwelling} />
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <H2>Periodos pendientes</H2>
          <Button
            onPress={() =>
              navigate(`/dwellings/${dwelling.uuid}/register-period`)
            }
            className="bg-blue-500"
          >
            Agregar
          </Button>
        </div>
        <PendingPeriodsContainer dwelling_uuid={dwelling.uuid} />
      </div>

      <div className="mt-5">
        <H2 className="mb-3">Vecinos</H2>
        <NeighborsContainer dwelling_uuid={dwelling.uuid} />
      </div>

      <div className="mt-5">
        <H2 className="mb-3">Últimos pagos</H2>
        <ContributionsContainer dwelling_uuid={dwelling.uuid} />
      </div>
    </div>
  );
}

export const PendingPeriods = ({ data, isLoading }) => {
  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!data) return <div>Error al obtener los datos.</div>;

  if (data.length === 0) {
    return (
      <div className="w-full h-full rounded-xl p-2 font-semibold text-xs text-center text-green-500 bg-green-100 dark:bg-gray-800 shadow">
        Enhorabuena, no hay periodos pendientes.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 text-xs text-center">
        Periodos pendientes: {data.length}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.uuid}
            className="w-full h-full rounded-xl p-2 text-xs text-start text-red-600 dark:text-red-100 font-bold bg-red-100 dark:bg-red-600 flex items-center justify-between"
          >
            <div>
              <div>{item.month_name}</div>
              <div>{item.year}</div>
            </div>

            <DeletePeriodModalContainer period_uuid={item.uuid} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Neighbors = ({ data, isLoading, refetch }) => {
  const navigate = useNavigate();
  const { dwelling_uuid } = useParams();
  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!data) return <div>Error al obtener los datos.</div>;

  if (data.length === 0) {
    return (
      <div className="w-full h-full rounded-xl p-2 font-semibold text-xs text-center text-red-500 bg-green-100 dark:bg-gray-800 shadow">
        <div>No hay vecinos registrados.</div>

        <Button
          onPress={() => {
            navigate(`/dwellings/${dwelling_uuid}/register-neighbor`);
          }}
          className="text-xs text-white bg-blue-500 mt-2"
          size="xs"
        >
          Registrar vecino
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((item) => (
        <NeighborInfo key={item.uuid} neighbor={item} refetch={refetch} />
      ))}
    </div>
  );
};

export const Contributions = ({ data, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!data) return <div>Error al obtener los datos.</div>;

  if (data.length === 0) {
    return (
      <div className="w-full h-full rounded-xl p-2 font-semibold text-xs text-center text-red-500 bg-green-100 dark:bg-gray-800 shadow">
        No hay pagos registrados.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {data.map((item) => (
        <div
          key={item.uuid}
          className="w-full rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200 font-semibold bg-gray-100 dark:bg-gray-800 shadow"
        >
          <div className="flex justify-between items-center text-lg">
            <div>{item.date_text}</div>

            <div className="flex items-center">
              <MoneyFormat amount={item.amount} />
              <Dropdown>
                <DropdownTrigger>
                  <button className="p-2 bg-gray-600 rounded-lg ml-2">
                    <IoIosSettings />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem onPress={() => navigate(`/contributions/${item.uuid}/edit`)} key="edit">Editar</DropdownItem>
                  <DropdownItem key="changeDwelling">Cambiar vivienda</DropdownItem>
                  <DropdownItem key="editNeighbors">Cambiar vecino</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="text-xs">
            <div>Folio: {item.folio}</div>
          </div>
          <div className="border-t mt-2 pt-2 border-gray-200 dark:border-gray-600">
            Vecino:{" "}
            <span className="capitalize">
              {item.neighbor_name || "Sin vecino"}
            </span>
          </div>
          <div className="border-t mt-2 pt-2 border-gray-200 dark:border-gray-600">
            Recolectado por:{" "}
            <span className="capitalize">{item.collector_name}</span>
          </div>
          <div className="text-xs border-t mt-2 pt-2 border-gray-200 dark:border-gray-600">
            Comentarios: <span>{item.comments}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const RegisterNeighborPage = ({
  data: dwelling,
  isLoading,
  neighbor,
  onChange,
  onSubmit,
  isSending,
  sendingSuccess,
  errorNeighbor,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sendingSuccess && !isSending) {
      toast.success("Vecino registrado correctamente.");
      navigate(`/dwellings/${dwelling.uuid}`);
    }
  }, [sendingSuccess, isSending]);

  useEffect(() => {
    if (errorNeighbor) {
      const { response } = errorNeighbor;
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
  }, [errorNeighbor]);

  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!dwelling) return <div>Error al obtener los datos.</div>;

  return (
    <div>
      <DwellingHeader dwelling={dwelling} />
      <div className="mt-5">
        <H1 className="mb-5">Registrar vecino</H1>
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

export const RegisterPeriodPage = ({
  data: dwelling,
  isLoading,
  period,
  onChange,
  onSubmit,
  isSending,
  sendingSuccess,
  errorPeriod,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sendingSuccess && !isSending) {
      toast.success("Periodo registrado correctamente.");
      navigate(`/dwellings/${dwelling.uuid}`);
    }
  }, [sendingSuccess, isSending]);

  useEffect(() => {
    if (errorPeriod) {
      const { response } = errorPeriod;
      if (!response) {
        toast.error("Error al registrar periodo.");
        return;
      }

      const { data } = response;
      if (!data.errors) {
        toast.error("Error al registrar periodo.");
        return;
      }

      const error = Object.values(data.errors)[0];
      toast.error(error);
    }
  }, [errorPeriod]);

  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!dwelling) return <div>Error al obtener los datos.</div>;

  return (
    <div>
      <DwellingHeader dwelling={dwelling} />
      <div className="mt-5">
        <H1 className="mb-5">Registrar periodo</H1>
        <PeriodForm
          period={period}
          onChange={onChange}
          onSubmit={onSubmit}
          isSending={isSending}
        />
      </div>
    </div>
  );
};

export const RegisterContributionPage = ({
  data: dwelling,
  isLoading,
  contribution,
  onChange,
  onSubmit,
  isSending,
  sendingSuccess,
  errorContribution,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sendingSuccess && !isSending) {
      toast.success("Contribución registrada correctamente.");
      navigate(`/dwellings/${dwelling.uuid}`);
    }
  }, [sendingSuccess, isSending]);

  useEffect(() => {
    if (errorContribution) {
      const { response } = errorContribution;
      if (!response) {
        toast.error("Error al registrar contribución.");
        return;
      }

      const { data } = response;
      if (!data.errors) {
        toast.error("Error al registrar contribución.");
        return;
      }

      const error = Object.values(data.errors)[0];
      toast.error(error);
    }
  }, [errorContribution]);

  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (!dwelling) return <div>Error al obtener los datos.</div>;

  return (
    <div>
      <DwellingHeader dwelling={dwelling} />
      <div className="mt-5">
        <H1 className="mb-5">Registrar contribución</H1>
        <div>Sigues y llena la información</div>
        {/* <ContributionForm
          contribution={contribution}
          onChange={onChange}
          onSubmit={onSubmit}
          isSending={isSending}
        /> */}
      </div>
    </div>
  );
};
