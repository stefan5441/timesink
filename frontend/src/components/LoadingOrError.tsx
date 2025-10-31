import { Error } from "./Error";
import { Loading } from "./Loading";

type Props = {
  isError: boolean;
  isLoading: boolean;
};

export const LoadingOrError = ({ isError, isLoading }: Props) =>
  isError ? <Error /> : isLoading ? <Loading /> : undefined;
