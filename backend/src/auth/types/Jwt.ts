export type JwtPayload = {
  email: string;
  role: string;
};

export type JwtToken = {
  access_token: string;
  refresh_token: string;
};
