const info = [
  {
    id: 1,
    name: 'homacall',
    address: 'آدرس هماکال در اینجا قرار خواهد گرفت.',
    phone: '23234566',
    mobile: '09112345671',
    fax: '45632456',
    email: 'homacall.gmail.com',
    site: 'homacall.com',
    insta: '-',
    about: 'درباره هماکال در اینجا قرار خواهد گرفت.',
    language: 1,
    logo: '-',
    sms: '34567243'
  },
];

export const getCompanyInfo = () => {
  return info

}

export const InsertCompany = (values) => {
  console.log("Inser: ", values);
}

export const UpdateCompany = (values, companyId) => {
  alert(companyId);
  
}

export const DeleteCompany = id => {
  alert(id)
}

export const getCompanyById = id => {
  return info
    
}


export const getAllLanguages = () =>{
     return  [
        {name: 'فارسی', id: 1},
        {name: 'انگلیسی', id: 2},
    ];
}