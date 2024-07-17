import { axiosInstance } from ".";


export interface ITableItem {
    id: string
    [key: string]: string
}

export const tableApi = {
    getTable: async (token: string) => {
        return await axiosInstance.get(`/userdocs/get`,{
            headers: {
                "x-auth": token
            }
        });
      },
}