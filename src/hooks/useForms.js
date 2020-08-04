import  { useState } from 'react'

function useForm(valoreInciais){
    const [values, setValues] = useState(valoreInciais);
  
      function setValue(chave, valor){
        setValues({
          ...values,
          [chave] : valor 
        })
      }
  
      function handlerChange(event){
        //const {getAttribute, value } = event.target
        setValue(event.target.getAttribute('name'), event.target.value)
      }
  
      function clearForm (){
        setValues(valoreInciais)
      }
      return {
        values,
        handlerChange,
        clearForm, 
      }
  }

  export default useForm;