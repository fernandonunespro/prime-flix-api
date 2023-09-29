import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api"
import "./filme-info.css";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "b5805910d0d74fb5089f5474768e234c",
                    language: "pt/BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme nao encontrado");
                navigate("/", { replace: true});
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            alert("Filme já listado!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="Filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info"> 
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliacao: {filme.vote_average} / 10</strong>

        <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Triler`}>
                    Trailer
                </a>
            </button>
        </div>

        </div>
    )
}

export default Filme;