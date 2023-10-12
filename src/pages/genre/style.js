import styled from "styled-components";

//- With #
//#002c47, #00aab3, #ffcf33, #ffa733, #ff0035
//
//- Array
//["002c47","00aab3","ffcf33","ffa733","ff0035"]
//
//- Object
//{"Prussian blue":"002c47","Verdigris":"00aab3","Sunglow":"ffcf33","Orange peel":"ffa733","Imperial red":"ff0035"}

export const Mov = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: transform 0.3s, box-shadow 0.3s;
    border-radius: .5rem;
    //border: 1px solid #fff;
    :hover {
        transform: scale(1.05);
        img{
            box-shadow: 0 0 15px .1px #fff;
        }
    }
    div{
        width: 100%;
        height: 100%;
    }
    img {
        border-radius: .5rem;
        margin-bottom: 1rem;
    }
    p {
        font-weight: normal;
        font-size: 90%;
        text-align: center;
        color: #fff;
    }
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
