import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Topo, { Footer } from "../extra";
import { SliderLegal } from "../home";
import "./style.css";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";
    
    const [movie, setMovie] = useState([]);
    const [alike, setAlike] = useState([]);
    const [genres, setGenres] = useState([]);

    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        async function carregaAlike() {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genres.slice(0,3)}&language=pt-BR`)
                    .then((response) => response.json())
                    .then((data) => {
                        let res = data.results;
                        res = res.filter((mov) => {
                            return mov.id !== movie.id;
                        });
                        setAlike(res);
                        console.log(res);
                    });
            }

        async function carregaFilme() {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                let filme = data;
                data.release_date = format(new Date(data.release_date), "dd/MM/yyyy");
                data.vote_average = data.vote_average.toFixed(1);
                let genre = data.genres.map((genre) => {
                    return genre.id;
                });
                console.log(genre);
                setGenres(genre);
                setMovie(filme);              
            }); // eslint-disable-next-line
        }
        carregaFilme();
        console.log(genres);
        carregaAlike();
    }, [id]);

    useEffect(() => {
        async function carregaAlike() {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genres.slice(0,3)}&language=pt-BR`)
                    .then((response) => response.json())
                    .then((data) => {
                        let res = data.results;
                        res = res.filter((mov) => {
                            return mov.id !== movie.id;
                        });
                        setAlike(res);
                        console.log(res);
                    });
            }
        carregaAlike();
    }, [genres]);

    document.title = movie.title;

    return (
        <div>
            <Topo/>

            <Container>
                <Row>
                    <Col md={5}>
                        <Image fluid
                            src={`${imagePath}${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </Col>
                    <Col md={7}>
                        <Row>
                            <h1>{movie.title}</h1>
                            <h3>Nota: {movie.vote_average}</h3>
                            <h3>Data de lançamento: {movie.release_date}</h3>
                            <div>
                                <h4>Descrição: </h4>
                                <p>{movie.overview}</p>
                            </div>
                            <div>
                                <h4>Gêneros: </h4>
                                <ul>
                                    {movie.genres &&
                                        movie.genres.map((genre) => {
                                            return (
                                                <Link key={genre.id} to={`/discover/${genre.name}`}>
                                                <li className="badge text-bg-primary rounded-pill" >
                                                    {genre.name}
                                                </li>
                                                </Link>
                                            );
                                        })}
                                </ul>
                            </div>
                            <Link to="/">
                                <Button variant="primary">Voltar</Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <h1>Filmes parecidos</h1>
                <SliderLegal oloco={alike}/>
            </Container>
            <Footer/>
        </div>
    );
};

export default Movie;
