const validate = values => {
  const errors = {}
  if (!values.MenuLnk_SysTagID) {
    errors.MenuLnk_SysTagID = 'انتخاب سیستم الزامی است'
  }

  if (!values.MenuLnk_TagID) {
    errors.MenuLnk_TagID = 'انتخاب تگ الزامی است'
  }

  if (!values.MenuLnk_FrmTagID) {
    errors.MenuLnk_FrmTagID = 'انتخاب فرم الزامی است'
  }

  if (!values.MenuLnk_ActnTagID) {
    errors.MenuLnk_ActnTagID = 'انتخاب اکشن الزامی است'
  }

  if (!values.MenuLnk_TypRoutID) {
    errors.MenuLnk_TypRoutID = `انتخاب نوع مسیر الزامی است`
  }

  return errors
}

export default validate
