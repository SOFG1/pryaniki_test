import { axiosInstance } from ".";

export interface ITableItem {
  id: string;
  [key: string]: string;
}

export const tableApi = {
  getTable: async (token: string) => {
    return await axiosInstance.get(`/userdocs/get`, {
      headers: {
        "x-auth": token,
      },
    });
  },
  deleteItem: async (token: string, id: string) => {
    return await axiosInstance.post(
      `/userdocs/delete/${id}`,
      {},
      {
        headers: {
          "x-auth": token,
        },
      }
    );
  },
};
