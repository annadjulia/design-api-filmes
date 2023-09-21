import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;

    h1 {
        text-align: center;
        margin: 4rem 0;
    }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: transform 0.3s, box-shadow 0.3s;
    border-radius: .5rem;
    padding: 2rem;
    :hover {
        transform: scale(1.1);
        box-shadow: 0 0 20px #fff;
    }
    img {
        width: 180px;
        border-radius: .5rem;
        margin-bottom: 1rem;
    }
    span {
        font-weight: normal;
        font-size: 120%;
        text-align: center;
    }
    /*a {
        transition: all 0.3s;
    }
    a:hover {
        transform: scale(1.1);
    }*/
`;

export const Btn = styled.button`
    margin-top: 5px;
    padding: 0.7rem 3rem;
    border: none;
    border-radius: 5px;
    color: #212121;
    background-color: #ffffff;
    font-weight: 1000;
    font-size: 12 px;
    cursor: pointer;
    transition: all 250ms;
`;
