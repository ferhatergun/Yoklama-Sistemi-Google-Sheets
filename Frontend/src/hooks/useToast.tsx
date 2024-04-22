import toast from "react-hot-toast"


const useSuccess = (message:string) => {
    toast.success(message,{
        style:{
            padding: '10px',
            minWidth: '150px',
        }
    });

}

const useError = (message:string) => {
    toast.error(message,{
        style:{
            padding: '10px',
            minWidth: '150px',
        }
    });
}


export { useSuccess , useError }