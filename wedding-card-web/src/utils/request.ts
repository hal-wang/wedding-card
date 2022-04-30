import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
} from 'axios';

export interface ReqParams {
  url?: string;
  data?: any;
  query?: any;
  headers?: AxiosRequestHeaders;
}

function getBaseUrl(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_GLOB_API_PROXY_PREFIX as string;
  } else {
    const tcbEnv = (window as any)._tcbEnv;
    return `https://${tcbEnv.TCB_SERVICE_DOMAIN}/${tcbEnv.API_NAME}`;
  }
}

const baseRequest = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10 * 1000,
});

async function showError(msg: string) {
  alert(msg);
}

export async function request<T = any>(method: Method, params?: ReqParams): Promise<T | null> {
  const cfg: AxiosRequestConfig<T> = {
    method: method,
    url: params?.url,
    headers: params?.headers ?? {},
    params: params?.query,
    data: params?.data,
  };

  try {
    const res = await baseRequest.request(cfg);
    return (res.data || {}) as T;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      const res = error.response as AxiosResponse;
      await showError(res.data?.message ?? `${res.status} ${res.statusText}`);
    } else {
      await showError((err as Error)?.message ?? '网络连接错误，请检查网络后重试');
    }
    return null;
  }
}

export const post = <T = any>(ps?: ReqParams): Promise<T | null> => request('post', ps);
export const get = <T = any>(ps?: ReqParams): Promise<T | null> => request('get', ps);
export const patch = <T = any>(ps?: ReqParams): Promise<T | null> => request('patch', ps);
export const delete_ = <T = any>(ps?: ReqParams): Promise<T | null> => request('delete', ps);
export const put = <T = any>(ps?: ReqParams): Promise<T | null> => request('put', ps);
