import { useEffect, useState } from "react";
import { Mov, Btn, Fav } from "./style";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Carousel  from 'react-bootstrap/Carousel';
import Swal from "sweetalert2";
import Topo, { Footer } from "../extra";

const imagePath = "https://image.tmdb.org/t/p/w500";
const SliderLegal = (props) => {
    return (
        <Row>
        <Slider className="row" lazyLoad="progressive" slidesToScroll={1} slidesToShow={6} dots={true} speed={400}>
            {props.oloco.map((movie) => {
                return (
                    <Mov className="col-2" sm={2} key={movie.id}>
                    <Link to={`/${movie.id}`}>
                        <Image fluid rounded
                            src={`${imagePath}${movie.poster_path}`}
                            alt={movie.title} title={movie.title}
                        />
                    </Link>
                    </Mov>
                );
            })}
        </Slider>
        </Row>
    );
}

function Home() {
    const [list, setList] = useState([]);
    const [pops, setPops] = useState([]);
    const [nows, setNows] = useState([]);
    const [tops, setTops] = useState([]);
    const [coms, setComs] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        document.title = "THE WATCHER";
        async function carregaList() {
            Swal.showLoading();
        fetch(`https://api.themoviedb.org/3/list/8271861?api_key=${KEY}&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                setList(data.items);
                carregaPops();
                carregaNows();
                carregaTops();
                carregaComs();
                Swal.close();
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
    }, [KEY]);

    

    return (
        <div>
            
            <Topo/>

            <Container>
                <Carousel autoPlay interval={3000} fade indicators={false} >
                    {list.map((movie) => {
                        return (
                            <Carousel.Item key={movie.id}>
                            <Fav className="container-fluid my-4" key={movie.id}>
                                <Row>
                                    <Col md={7}>
                                        <Image fluid
                                            src={`${imagePath}${movie.backdrop_path}`}
                                            alt={movie.title} title={movie.title}
                                        />
                                    </Col>
                                    <Col md={5}>
                                        <Row className="align-content-center p-4">
                                            <Col auto>
                                                <p className="titulo aa">{movie.title ? movie.title.toUpperCase() : ""}</p>
                                                <Link to={`/${movie.id}`}>
                                                    <Button>Ver mais</Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row> 
                            </Fav>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </Container>
            <Container>
                <h1 className="titulo">EM CARTAZ</h1>
                <SliderLegal oloco={nows} />

                <h1 className="titulo">Populares</h1>
                <SliderLegal oloco={pops} />

                <h1 className="titulo">Melhores classificações</h1>
                <SliderLegal oloco={tops} />

                <h1 className="titulo">Em breve</h1>
                <SliderLegal oloco={coms} />
            </Container>
            <Footer/>
        </div>
    );
}

export default Home;
export { SliderLegal };