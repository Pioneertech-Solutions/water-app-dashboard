import { Skeleton } from "@nextui-org/react";
import { H1, H2 } from "./text";

export const NeighborName = ({ data, isLoading }) => {
  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  return data;
}

export const EditContribution = ({ data, isLoading, error }) => {
  if (isLoading) return <Skeleton className="h-10 w-full rounded-xl" />;
  if (error) return <div>Ocurrio un error al buscar los datos.</div>

  return (
    <div>
      <div>Folio con numeración:</div>
      <H2>
        {data?.folio}
      </H2>
    </div>
  );
};
