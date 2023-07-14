export type AxiosFetchProps = {
  credentials?: boolean;
  url: string;
  headers?: object;
  timeout?: number;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
  data?: any;
  throwError?: boolean;
};

export type FetchPostProps = {
  postUrl: string;
  timeout?: number;
};

export type VideoJson = {
  username: string;
  caption: string;
  width: string;
  height: string;
  downloadUrl: string;
  thumbnailUrl: string;
};