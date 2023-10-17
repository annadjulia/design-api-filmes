import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Container, Image, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Topo() {
    const KEY = process.env.REACT_APP_KEY;
    const [genres, setGenres] = useState([]);
    const navigation = useNavigate();
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`)
            .then(response => response.json())
            .then(data => {
                setGenres(data.genres);
            });
    }, [KEY]);

    return (
        <Navbar bg="light">
        <Container className="px-3">
                <Navbar.Brand href="/"><Image src="https://res.cloudinary.com/dj1sdgtdr/image/upload/v1696754878/sl9kykdycraptdquub5y.png" alt="logo" width="auto" height="50" /></Navbar.Brand>
                
                <Navbar.Collapse id="navbarsExample09">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <NavDropdown title="Gêneros" id="basic-nav-dropdown">
                            {genres.map((genre) => {

                                    return (
                                            <NavDropdown.Item className="ee" key={genre.id} onClick={() => navigation(`/discover/${genre.id}`)}>{genre.name}</NavDropdown.Item>
                                    );
                            })}
                        </NavDropdown>
                    </Nav>
                    <Form role="search" onSubmit={(event) => {
                        event.preventDefault();
                        navigation(`/search/${query}`);
                    }}>
                        <FormControl type="text" value={query} placeholder="Pesquisar" aria-label="Search" onChange={(event) => setQuery(event.target.value)} className="mr-2" />
                    </Form>
                </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
function Footer() {
    const KEY = process.env.REACT_APP_KEY;
    const [genres, setGenres] = useState([]);
    const navigation = useNavigate();

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`)
        .then(response => response.json())
        .then(data => {
            setGenres(data.genres);
        });

    return (
        <Navbar bg="light">
            <Container>
                <Row className="py-4">
                    <Col sm={3}>
                        <Image fluid className="rodafoto" src="https://res.cloudinary.com/dj1sdgtdr/image/upload/v1696754878/sl9kykdycraptdquub5y.png" alt="logo" />
                    </Col>
                    <Col sm={6}>
                        <Row className="align-content-center px-5 h-100 cc">
                            <Col>
                                {genres.map((genre) => {
                                return (
                                    <Link key={genre.id} to={`/discover/${genre.id}`}>
                                    <li className="badge m-1 text-bg-danger rounded-pill" >
                                        {genre.name}
                                    </li>
                                    </Link>
                                );
                                })}
                            </Col>
                        </Row>                    
                    </Col>
                    <Col className="notape" sm={3}>
                        <Row className="align-content-center h-100">
                            <Col>
                                <p>Contato</p>
                                <p>Sobre</p>
                                <p>Termos de uso</p>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default Topo;
export { Footer };