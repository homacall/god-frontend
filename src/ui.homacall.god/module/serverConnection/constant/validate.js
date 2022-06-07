const validate = values => {
  const errors = {}

  if (!values.SerConn_IP) {
    errors.SerConn_IP = 'IP الزامی است'
  }

  if (!values.SerConn_Port) {
    errors.SerConn_Port = 'port الزامی است'
  }

  if (!values.SerConn_DbName) {
    errors.SerConn_DbName = 'نام پایگاه داده الزامی است'
  }

  if (!values.SerConn_UsrID) {
    errors.SerConn_UsrID = 'UserID الزامی است'
  }

  if (!values.SerConn_HPass) {
    errors.SerConn_HPass = `پسورد الزامی است`
  }

  if (!values.SerConn_SysID) {
    errors.SerConn_SysID = 'System ID الزامی است'
  }

  if (!values.SerConn_ServTypID) {
    errors.SerConn_ServTypID = 'انتخاب سرویس الزامی است'
  }

  if (!values.SerConn_CoInID) {
    errors.SerConn_CoInID = 'نام شرکت الزامی است'
  }

  return errors
}

export default validate
