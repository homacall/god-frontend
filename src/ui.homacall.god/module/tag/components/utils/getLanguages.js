

const GetTranslateLanguage = (...dataL) =>{
 // Get languages list from server with api
  const languages = [
    {
      id: 1,
      name: 'fa'
    },
    {
      id: 2,
      name: 'en',
     
    },
    {
      id: 3,
      name: 'kr',
     
    },
    {
      id: 4,
      name: 'ch',
     
    },
    
 ]

var props = ['id', 'name'];

var result = languages.filter(function(lang){
    // filter out (!) items in result2
    return !dataL.some(function(data){
        return lang.id === data.lang_id;          // assumes unique id
    });
}).map(function(o){
    // use reduce to make objects with only the required properties
    // and map to apply this to the filtered array as a whole
    return props.reduce(function(newo, name){
        newo[name] = o[name];
        
        return newo;
    }, {});
});

const languagesToTranslate = [];

result.forEach(val=>{
  const obj = {label: val.name, value: val.id};
  languagesToTranslate.push(obj);
  
})

 return languagesToTranslate;
}

export default GetTranslateLanguage