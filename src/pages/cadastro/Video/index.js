import  React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForms';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo(){
  const history = useHistory();

  const [categorias, setCategorias] = useState([]);
  const categoryTitle = categorias.map(({titulo}) => {
    return titulo
  })
  //const categoryTitle = categorias.map(({ titulo }) => titulo);

  
  const { handlerChange, values } = useForm({
    titulo: 'video padrao',
    url: 'https://www.youtube.com/watch?v=73QBc1V8JHM', 
    categoria: 'Fron End'
  })

  useEffect(() =>{

    categoriasRepository.getAll()
    .then((categoriasFromServe) => {
      setCategorias(categoriasFromServe);
    })
    
  }, []);


    return (
      <PageDefault>
        
       <h1>Cadastro de Vídeo</h1>

        <form onSubmit={(event) =>{
          event.preventDefault();
          //alert("video cadastrado com sucesso")


          const categoriaEscolhida = categorias.find((categoria) =>{
            return categoria.titulo === values.categoria
          })
          videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          })
          .then(()=> {
            console.log('video cadastrado com sucesso')
            history.push("/");
          });


          
        }}>
          <FormField
            label="Título da categoria"
            type="text"
            name="titulo"
            value = {values.titulo}
            onChange={handlerChange}
          />
          <FormField
            label="URL"
            type="text"
            name="url"
            value = {values.url}
            onChange={handlerChange}
          />

        <FormField
            label="Categoria"
            type="text"
            name= "categoria"
            value = {values.categoria}
            onChange={handlerChange}
            suggestions= {categoryTitle}

                    
            
          />
        <Button type="submit">
            Cadastrar
        </Button>
        </form>

        <Link to="/cadastro/categoria">
          Cadastrar Categoria
        </Link>
      </PageDefault>
    )
}


export default CadastroVideo;
