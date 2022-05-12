import Language from "./component/language"

export const LanguagePage = () => {
    const data = [
        {
            id: 1,
            title: 'فارسی',
            layout: 'راست به چپ'
        },
        {
            id: 2,
            title: 'انگلیسی',
            layout: 'چپ به راست'
        }
    ];

    return <Language data={data} />
}
