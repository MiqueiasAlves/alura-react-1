import  React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria(){
  const  valoreInciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  }
  const [categorias, setCategorias] = useState([]);

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


  useEffect(() => {
    console.log("teste");

    const URL_TOP = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/categorias'
    : "https://dev-app-alura.herokuapp.com/categorias" ;

    fetch(URL_TOP)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ])
      })

    /*setTimeout(() => {
      setCategorias([
        ...categorias,
       
        {
          id : 1,
           nome : "Front End",
          cor : "#6BD1FF"
        },
        {
          id : 2,
          nome : "Front End",
          cor : "#6BD1FF"
        }
      ]);
    }, 4 * 1000);*/


  }, []);


    return (
      <PageDefault>
        
       <h1>Cadastro de Categoria: {values.nome} </h1>

      <form onSubmit={function handleSubmit(event){
        event.preventDefault();

        setCategorias([
          ...categorias,
          values
        ]);
        setValues(valoreInciais)

      }}>
     
      <FormField
        label="Nome da categoria"
        type="text"
        name="nome"
         value = {values.nome}
         onChange={handlerChange}
      />

        
      <FormField
          label="Descrição"
          type="textarea"
          name="descricao"  
          value = {values.descricao}
          onChange={handlerChange}
        />

        {/*<div>
          <label>Descrição:
            <textarea type="text" 
              value={values.descricao} 
              name="descricao" 
              onChange={handlerChange} />
          </label>
        </div>*/}


        <FormField
          label="Cor"
          type="color"
          name="cor"  
          value = {values.cor}
          onChange={handlerChange}
        />

        {/*<div>
          <label>Cor:
            <input type="color"
              value={values.cor} 
              name="cor"  
              onChange={handlerChange} />
          </label>
        </div>*/}

        <Button>
            Cadastrar
        </Button>
      </form>


        {categorias.length ===0 &&
          <div>
              LOading...
          </div>
        }
      

      <ul>
          {categorias.map(function(categoria, indice){
            return (
            <li key={`${categoria}${indice}`}>
                {categoria.titulo}
             </li>
            )
          })}
      </ul>   
      </PageDefault>
    )
}



export default CadastroCategoria;
