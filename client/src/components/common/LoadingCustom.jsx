import { Loader } from "@mantine/core"

export const PageLoading = ()=>{
    return <div className="py-20 flex justify-center items-center flex-col ">
        <Loader color="#581D9E" size={20}/>
        <span className="text-primOne font-semibold">Loading...</span>
    </div>
}