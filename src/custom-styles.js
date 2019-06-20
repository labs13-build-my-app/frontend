import styled from "styled-components";

export const Button = styled.button`
  background-color: #4E72B7;
  border: 1px solid #4E72B7;
  color: white;
  ${props => props.small && `font-size: 1.0rem;`}
  ${props => (props.medium ? `font-size: 1.2rem;` : null)}
  ${props => (props.large ? `font-size: 1.5rem;` : null)}
  padding: 10px 25px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  margin-top: 25px;
  margin-bottom: 25px

  &:hover{
    background: white;
    color: #4E72B7;
  }
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
  border: 1px solid lightgrey;
  border-radius: 15px;
  box-shadow: lightgrey 15px 15px 15px;
  padding: 10px;
`;

export const PageTitle = styled.h1`
  text-align: left;
  border-bottom: 1px black solid;
  width: 80%;
  padding-bottom: 5px;
  margin: 5px auto;
`;
