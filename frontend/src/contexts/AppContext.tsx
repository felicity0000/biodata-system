import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';
type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
     userName: string;
}

//each time the app opens for the firsst time the context will be undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

//creating the app context provider
export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const {isError, data:userData} = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
     })
    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    console.log(toastMessage);
                    setToast(toastMessage);
                },
                isLoggedIn: !isError,
                userName: userData?.userName
            }}>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
  };