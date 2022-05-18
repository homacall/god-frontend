import { useState } from "react"

export const useUpdateRoll = ()=>{
    const [rollName, setRollName]= useState("")

    return {
        rollName, setRollName
    }
}