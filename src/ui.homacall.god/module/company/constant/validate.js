const validate = values => {
    const errors = {};
  
    if (!values.CoIn_Name) {
      errors.CoIn_Name = 'نام و نام خانوادگی الزامی است';
    } else if (values.CoIn_Name.length < 5) {
      errors.CoIn_Name = 'نام و نام خانوادگی باید بیشتر از 6 حرف باشد';
    }
  
    if (!values.CoIn_Address) {
      errors.CoIn_Address = 'آدرس الزامی است';
    } else if (values.CoIn_Address.length < 5) {
      errors.CoIn_Address = 'آدرس نباید کمتر از 20 کاراکتر باشد';
    }
  
    if (!values.CoIn_Email) {
      errors.CoIn_Email = 'ایمیل الزامی است';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.CoIn_Email)) {
      errors.CoIn_Email = 'فرمت ایمیل صحیح نیست';
    }

    if (!values.CoIn_Phone) {
        errors.CoIn_Phone = 'تلفن الزامی است';
    }

    if (!values.CoIn_Mobile) {
        errors.CoIn_Mobile =  `موبایل الزامی است`;
    }

    if (!values.CoIn_Site) {
        errors.CoIn_Site = 'سایت الزامی است';
    }

    if (!values.CoIn_About) {
        errors.CoIn_About = 'درباره ما الزامی است';
    }

    if (!values.CoIn_LangID) {
        errors.CoIn_LangID = 'زبان الزامی است';
    }

    if (!values.CoIn_SmsNumber) {
      errors.CoIn_SmsNumber = 'شماره سامانه پیامک الزامی است';
  }
  
    return errors;
  };

  export default validate