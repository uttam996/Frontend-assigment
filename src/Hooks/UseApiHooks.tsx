import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

import axios from "axios"
import { BaseUrl } from "../ApiEndPoints"


export const UseGetData = () => {
    const getdata =  () => {
        return axios.get(`${BaseUrl}/component`)
    }

    return useQuery({
        queryKey: ["getdata"],
        queryFn: getdata
    })
}


export const UseAddData = () => {
        const queryClient = new QueryClient()
        const addData =  (data:any) => {
                return axios.post(`${BaseUrl}/component`, data)
        }

    return useMutation({
        mutationKey: ["addData"],
        mutationFn: addData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getdata"] })

        }
    })
}

export const UseUpdateData = () => {
    const queryClient = new QueryClient()
    const updateData =  (data:any) => {
            return axios.put(`${BaseUrl}/component/${data?.componentId}`, data)
    }

return useMutation({
    mutationKey: ["updateData"],
    mutationFn: updateData,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getdata"] })

    }
})
}
