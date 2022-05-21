import React, { useEffect, useState } from 'react'


const Title = ({ name }) => {
    const [title, setTitle] = useState("");

    
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    
    <title>`${title}`</title>
  )
}
export default Title
