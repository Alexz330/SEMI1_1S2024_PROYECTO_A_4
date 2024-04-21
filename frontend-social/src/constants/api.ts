const VITE_URL_BACKEND: string = (import.meta as any).env.VITE_URL_BACKEND as string;
const VITE_PORT_BACKEND: number = parseInt((import.meta as any).env.VITE_PORT_BACKEND as string);

export {
    VITE_PORT_BACKEND,
    VITE_URL_BACKEND
};
