import * as axios from "axios";
import * as Redux from "redux";
import { startLoading, finishLoading } from "../modules/loading";

export default function createRquestThunk<T>(
  type: string,
  request: (id: number) => Promise<axios.AxiosResponse<T>>
) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (id: number) => (dispacth: Redux.Dispatch<Redux.AnyAction>) => {
    dispacth({ type });
    dispacth(startLoading(type));

    request(id)
      .then((response) => {
        dispacth({
          type: SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispacth({
          type: FAILURE,
          payload: error,
          error: true,
        });
      })
      .finally(() => {
        dispacth(finishLoading(type));
      });
  };
}
