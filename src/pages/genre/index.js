import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mov } from "./style";
import { Container, Row, Col, Image } from "react-bootstrap";
import Topo, { Footer } from "../extra";
import { Link } from "react-router-dom";
import "./style.css";

const Genre = () => {
    const KEY = process.env.REACT_APP_KEY;
    const [genreName, setGenreName] = useState([]);
    const { genreid } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genreid}&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                setList(data.results);
            });
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                let [aaa] = data.genres.map((genre) => {
                    if(genre.id === genreid){
                        return genre.name;
                    }
                })
                console.log(aaa[0]);
                setGenreName(aaa[0]);
        });
    }, [genreid]);

    document.title = genreName;

    return(
        <div>
            <Topo/>

            <Container>
                <Row>
                    <Col>
                        <Row>
                            <p>{genreName}</p>
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
                                                <Image fluid src={imagePath + mov.poster_path} alt={mov.title} />
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

export default Genre;