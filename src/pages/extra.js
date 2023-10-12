import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Container, Image, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Topo() {
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
          <Navbar.Brand href="/"><Image src="https://res.cloudinary.com/dj1sdgtdr/image/upload/v1696754878/sl9kykdycraptdquub5y.png" alt="logo" width="auto" height="50" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarsExample09" />
        <Navbar.Collapse id="navbarsExample09">
            <Nav className="me-auto mb-2 mb-lg-0">
                <Nav.Link href="#">Filmes</Nav.Link>
                <NavDropdown title="Gêneros" id="basic-nav-dropdown">
                    {genres.map((genre) => {

                            return (
                                    <NavDropdown.Item key={genre.id} onClick={() => navigation(`/discover/${genre.id}`)}>{genre.name}</NavDropdown.Item>
                            );
                    })}
                </NavDropdown>
            </Nav>
            <Form role="search">
                <FormControl type="search" placeholder="Search" aria-label="Search" className="mr-2" />
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
                <Row>
                    <Col sm={5}>
                        <Image fluid src="https://res.cloudinary.com/dj1sdgtdr/image/upload/v1696754878/sl9kykdycraptdquub5y.png" alt="logo" />
                    </Col>
                    <Col sm={5}>
                        <p>Filmes</p>
                        {genres.map((genre) => {
                            return (
                                    <p className="badge text-bg-primary rounded-pill" key={genre.id} onClick={() => navigation(`/discover/${genre.id}`)}>{genre.name}</p>
                            );
                    })}
                    </Col>
                    <Col sm={2}>
                        <p>Contato</p>
                        <p>Sobre</p>
                        <p>Termos de uso</p>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
}

export default Topo;
export { Footer };