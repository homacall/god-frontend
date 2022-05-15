const GetTranslateLanguage = ({ translates, languages }) => {
  // Get languages list from server with api
  var props = ['id', 'name']

  var result = languages
    ?.filter(function (lang) {
      // filter out (!) items in result2
      return !translates.some(function (data) {
        return lang.id === data.tranTg_LangID // assumes unique id
      })
    })
    .map(function (o) {
      // use reduce to make objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce(function (newo, name) {
        newo[name] = o[name]

        return newo
      }, {})
    })

  const languagesToTranslate = []

  result?.forEach(val => {
    const obj = { label: val.name, value: val.id }
    languagesToTranslate.push(obj)
  })

  return languagesToTranslate
}

export default GetTranslateLanguage
