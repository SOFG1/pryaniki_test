import { axiosInstance } from ".";

export type SignInData = {
  username: string;
  password: string;
};

export const userApi = {
  login: async (data: SignInData) => {
    return await axiosInstance.post(`login`, data);
  },
};
