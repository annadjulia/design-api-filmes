import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mov } from "./style";
import { Container, Row, Col, Image } from "react-bootstrap";
import Topo, { Footer } from "../extra";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

const Search = () => {
    const KEY = process.env.REACT_APP_KEY;
    const { query } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [list, setList] = useState([]);

    useEffect(() => {
        Swal.showLoading();
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${query}`)
            .then(response => response.json())
            .then(data => {
                setList(data.results.filter(mov => mov.poster_path));
                console.log(data.results);
                Swal.close();
            });
    }, [query]);

    document.title = "Pesquisa";

    return(
        <div>
            <Topo/>

            <Container>
                <Row>
                    <Col>
                        <Row>
                            <p className="titulo">Resultados para: {query}</p>
                        </Row>
                    </Col>
                </Row>
                <Row className="rowa">
                    {list.map((mov) => {
                                return (
                                    <Col sm={2}>
                                    <Link to={`/${mov.id}`}>
                                    <Mov key={mov.id}>
                                        <Link to={`/${mov.id}`}>
                                            <div>
                                                <Image rounded fluid src={imagePath + mov.poster_path} alt={mov.title} />
                                            </div>
                                            
                                        </Link>
                                        <p>{mov.title}</p>
                                    </Mov>
                                    </Link>
                                    </Col>
                                );
                            })}
                </Row>
            </Container>
            <Footer/>
        </div>
    );

}

export default Search;