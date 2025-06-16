import { useState } from "react";

export const useToast = () => {
    const [toast,setToast] = useState<string | null>(null);

    const showToast = (mssg:string) => {
        setToast(mssg);
    }
    const clearToast = () => {
        setToast(null);
    }

    return {toast,showToast,clearToast};
}