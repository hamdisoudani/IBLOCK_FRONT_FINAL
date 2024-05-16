import toast from "react-hot-toast";
/**
 * Function that handle success toast notification 
 * It's required to add Toaster tag in the body of the tsx file
 * @param message: The message that will be displayed
 * @param duration: The diration of the message 
 */
export const useSuccessToast = (message: string , duration? :number) => {
    return toast.success(message, {
        duration: duration || 4000,
        position: 'top-center'
      });
}

/**
 * Function that handle error toast notification 
 * It's required to add Toaster tag in the body of the tsx file
 * @param message: The message that will be displayed
 * @param duration: The diration of the message
 */
export const useErrorToast = (message: string , duration? :number) => {
    return toast.error(message, {
        duration: duration || 4000,
        position: 'top-center'
      });
}