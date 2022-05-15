const validate = values => {
    const errors = {};
  
    if (!values.Comp_FName) {
      errors.Comp_FName = 'نام و نام خانوادگی الزامی است';
    } else if (values.Comp_FName.length < 6) {
      errors.Comp_FName = 'نام و نام خانوادگی باید بیشتر از 6 حرف باشد';
    }
  
    if (!values.Comp_Address) {
      errors.Comp_Address = 'آدرس الزامی است';
    } else if (values.Comp_Address.length < 20) {
      errors.Comp_Address = 'آدرس نباید کمتر از 20 کاراکتر باشد';
    }
  
    if (!values.Comp_Email) {
      errors.Comp_Email = 'ایمیل الزامی است';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Comp_Email)) {
      errors.Comp_Email = 'فرمت ایمیل صحیح نیست';
    }

    if (!values.Comp_Phone) {
        errors.Comp_Phone = 'تلفن الزامی است';
    }

    if (!values.Comp_Mobile) {
        errors.Comp_Mobile =  `موبایل الزامی است`;
    }

    if (!values.Comp_Site) {
        errors.Comp_Site = 'سایت الزامی است';
    }

    if (!values.Comp_About) {
        errors.Comp_About = 'درباره ما الزامی است';
    }

    if (!values.Comp_Lang) {
        errors.Comp_Lang = 'زبان الزامی است';
    }

    if (!values.Comp_SMS) {
      errors.Comp_SMS = 'شماره سامانه پیامک الزامی است';
  }
  
    return errors;
  };

  export default validate