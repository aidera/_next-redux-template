import instance from "./index";

interface IRegistryResponse {
  status: number;
  message: string;
  errors?: Array<string>;
}

export interface ILoginResponse {
  status: number;
  message: string;
  errors?: Array<string>;
  token?: string;
  userId?: string;
}

const authApi = {
  register(
    name: string,
    email: string,
    password: string
  ): Promise<IRegistryResponse> {
    return instance
      .post<IRegistryResponse>("auth/registry", {
        name,
        email,
        password,
      })
      .then((response) => {
        return response.data;
      });
  },

  login(email: string, password: string): Promise<ILoginResponse> {
    return instance
      .post<ILoginResponse>("auth/login", {
        email,
        password,
      })
      .then((response) => {
        return response.data;
      });
  },
};

export default authApi;
