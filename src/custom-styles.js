import styled from "styled-components";

export const Button = styled.button`
  background-color: #4e72b7;
  border: 1px solid #4e72b7;
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

  &:hover {
    background: white;
    color: #4e72b7;
  }
`;

// CARD COMPONENT MADE BY JOE

// export const Card = styled.div`
// display: flex;
// justify-content: space-around;
// align-items: center;
// margin: 20px auto;
// border: 1px solid lightgrey;
// border-radius: 15px;
// box-shadow: lightgrey 15px 15px 15px;
// padding: 10px;
// }
// `;

export const Card = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-around;
  -webkit-justify-content: space-around;
  -ms-flex-pack: space-around;
  justify-content: space-around;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 20px auto;
  border: 1px solid lightgrey;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
  padding: 10px;
  background-color: white;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
}
`;

export const PageTitle = styled.h1`
  text-align: left;
  border-bottom: 1px black solid;
  width: 80%;
  padding: 5px 0px;
  margin: 0 auto;
`;
export const Background = styled.div`
  background-color: rgba(245, 245, 245, 1);
  min-height: 100vh;
  padding: 1px 0px;
  width: 75%;
  margin-left: 25%;
`;
export const Pill = styled.div`
  ${props =>
    props.devType === "Web"
      ? `background-color: #4e72b7`
      : props.devType === "Android"
      ? `background-color: #3bdb85`
      : `background-color: #a3224f`}
  ${props =>
    props.devType === "Web"
      ? `border: #4e72b7`
      : props.devType === "Android"
      ? `border: #3bdb85`
      : `border: #a3224f`}
  
  color: white;
  font-size: 0.8rem;
  padding: 5px 0px;
  width: 60px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  margin-top: 25px;
  margin-bottom: 25px;
`;
