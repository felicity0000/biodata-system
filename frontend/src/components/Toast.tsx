import {useEffect} from 'react'
type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR"
    onClose: () => void;
}
const Toast = ({message, type, onClose}: ToastProps) => {
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [onclose]);
    const styles = type === "SUCCESS"
    ? "fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-green-600 text-white max-w-md"
    : "fixed top-4 right-4 z-50 px-4 py-2 rounded-md bg-red-600 text-white max-w-md"
  return (
    <div>
        <div className={styles}>
            <span className="text-lg font-semibold">{message}</span>
        </div>
    </div>
  )
}

export default Toast