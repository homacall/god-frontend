import { useEffect, useState } from "react"
import { GetAllLanguage } from "../../service/languageService"
import Language from "./component/language"

export const LanguagePage = () => {
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     GetAllLanguage()
    //         .then(res => {
    //             if (res.data) setData(res.data)
    //             console.log(data);
    //         })
    //         .catch(e => console.log(e))
    // }, [])
    const data = [
        {
            id: 1,
            lang_Name: 'فارسی',
            lang_Rtl: true
        },
        {
            id: 2,
            lang_Name: 'انگلیسی',
            lang_Rtl: false
        }
    ];

    return <Language data={data} />
}
