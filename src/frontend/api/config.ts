import rootApi from "./api";

export interface IListRes {
  id: number;
  name: string;
}

const path = {
  getCity: "/info/city",
  getJob: "/info/job",
};

const getListCity = async (): Promise<IListRes[]> => {
  return await rootApi({
    url: path.getCity,
    method: "get",
  });
};

const getListJob = async (): Promise<IListRes[]> => {
  return await rootApi({
    url: path.getJob,
    method: "get",
  });
};

export { getListCity, getListJob };
