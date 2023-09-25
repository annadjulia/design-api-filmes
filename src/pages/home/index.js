import { useEffect, useState } from "react";
import { Mov, Btn, Fav } from "./style";
import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [list, setList] = useState([]);
    const [pops, setPops] = useState([]);
    const [nows, setNows] = useState([]);
    const [tops, setTops] = useState([]);
    const [coms, setComs] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        async function carregaList() {
        fetch(`https://api.themoviedb.org/3/list/8271861?api_key=${KEY}&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                setList(data.items);
            });
        }
        async function carregaPops() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setPops(data.results);
            });
        }
        async function carregaNows() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setNows(data.results);
            });
        }
        async function carregaTops() {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setTops(data.results);
            });
        }
        async function carregaComs() {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setComs(data.results);
            });
        }

        carregaList();
        carregaPops();
        carregaNows();
        carregaTops();
        carregaComs();
    }, [KEY]);

    const SliderLegal = (props) => {
        return (
            <Slider slidesToScroll={1} slidesToShow={5} dots={true} speed={400}>
                {props.oloco.map((movie) => {
                    return (
                        <Mov key={movie.id}>
                            <img
                                src={`${imagePath}${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p>{movie.title}</p>

                            <Link to={`/${movie.id}`}>
                                <Btn>Detalhes</Btn>
                            </Link>
                        </Mov>
                    );
                })}
            </Slider>
        );
    }

    document.title = "THE WATCHER";

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand>THE WATCHER</Navbar.Brand>
            </Navbar>
            <Container>
                <h1>Favoritos</h1>
                <Slider slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={4000} speed={1100}>
                    {list.map((movie) => {
                        return (
                            <Fav className="container-fluid" key={movie.id}>
                                <Row>
                                    <Col md={3}>
                                        <Image
                                            src={`${imagePath}${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    </Col>
                                    <Col className="align-content-center" md={9}>
                                        <Row>
                                            <p>{movie.title}</p>

                                        <Link to={`/${movie.id}`}>
                                            <Btn>Detalhes</Btn>
                                        </Link>
                                        </Row>
                                    </Col>
                                </Row> 
                            </Fav>
                        );
                    })}
                </Slider>
            </Container>
            <Container>
                <h1>Em cartaz</h1>
                <SliderLegal oloco={nows} />

                <h1>Populares</h1>
                <SliderLegal oloco={pops} />

                <h1>Melhores classificações</h1>
                <SliderLegal oloco={tops} />

                <h1>Em breve</h1>
                <SliderLegal oloco={coms} />
            </Container>
        </div>
    );
}

export default Home;
