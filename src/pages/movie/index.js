import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Topo, { Footer } from "../extra";
import { SliderLegal } from "../home";
import Swal from "sweetalert2";
import "./style.css";

const Movie = () => {
    const KEY = process.env.REACT_APP_KEY;

    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const navigation = useNavigate();
    
    const [movie, setMovie] = useState({});
    const [alike, setAlike] = useState([]);
    const [genres, setGenres] = useState([]);
    
    async function scrollToTop() {
        return new Promise(resolve => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
    
            const checkScroll = setInterval(() => {
                if (window.scrollY === 0) {
                    clearInterval(checkScroll);
                    resolve();
                }
            }, 100);
        });
    }
    
    useEffect(() => {
        async function carregaFilme() {
            Swal.showLoading();
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`);
                const data = await response.json();
                let filme = data;
                console.log(filme);
                data.release_date = format(new Date(data.release_date), "dd/MM/yyyy");
                data.vote_average = data.vote_average.toFixed(1);
                let genre = data.genres.map((genre) => {
                    return genre.id;
                });
                setGenres(genre);
                console.log(genre);
                setMovie(filme);   
            } catch (error) {
                console.error("Erro ao carregar filme:", error);
            } 
        }
        carregaFilme();
    }, [id, KEY]);
    
    
    useEffect(() => {
        async function carregaAlike() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genres.slice(0,3)}&language=pt-BR`);
                const data = await response.json();
                let res = data.results.filter((mov) => mov.id !== movie.id);
                setAlike(res);
                console.log(res);
                await scrollToTop();
            } catch (error) {
                console.error("Erro ao carregar filmes similares:", error);
            } finally {
                Swal.close();
            }
        }
        carregaAlike();
    }, [genres, movie]);  
    
    document.title = movie.title;
    
    return (
        <div>
            <Topo/>

            <Container>
                <Row className="mx-5 my-4 w-auto">
                    <Col md={5}>
                        <Row className="justify-content-center">
                            <Col className="especial">
                                <Image fluid rounded className="imgPoster"
                                    src={`${imagePath}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col md={7}>
                        <Row className="align-content-center h-100">
                            <Col>
                            <Row>
                                <h1 className="titulo">{movie.title ? movie.title.toUpperCase() : ""}</h1>
                                {movie.vote_average && (
                                    <h3>Nota: {movie.vote_average}</h3>
                                )}
                                {movie.release_date && (
                                    <h3>Data de lançamento: {movie.release_date}</h3>
                                )}
                                {movie.overview && (
                                    <div>
                                        <h4>Descrição: </h4>
                                        <p>{movie.overview}</p>
                                    </div>
                                )}
                                {movie.genres && movie.genres.length > 0 && (
                                    <div>
                                        <h4>Gêneros: </h4>
                                        <ul>
                                            {movie.genres.map((genre) => {
                                                return (
                                                    <Link key={genre.id} to={`/discover/${genre.id}`}>
                                                        <li className="badge me-2 mb-1 text-bg-light rounded-pill">
                                                            {genre.name}
                                                        </li>
                                                    </Link>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                                <Link to='/'>
                                    <Button variant="primary">Voltar para Home</Button>
                                </Link>
                            </Row>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <h1 className="titulo">Filmes parecidos</h1>
                <SliderLegal oloco={alike}/>
            </Container>
            <Footer/>
        </div>
    );
};

export default Movie;
