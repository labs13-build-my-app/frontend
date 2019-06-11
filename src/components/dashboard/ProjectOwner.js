import React from "react";
import { Route } from "react-router";
import Projects from '../projects/Projects';
import placeholder from '../../assets/images/profile-placeholder.png';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 20px auto;
  border: 1px solid grey;
  border-radius: 15px;
  box-shadow: lightgrey 15px 15px 15px;
`;

const UserInfo = styled.div`
  width: 50%;
`;

const ProjectOwner = ({ user, role }) => {
  return (
    <div>
      <Card className={'card userCard'}>
        <div style={{width: '50%'}}>    
          <img 
            src={placeholder} 
            style={{
              borderRadius: '100%', 
              width: '50%',
              margin: '5px 0',
            }}
          />
        </div>
        <UserInfo>
          <h1>Joe Alfaro</h1>
          <p>Project Owner</p>
        {/* <h1>{user.firstName} {user.lastName}</h1>
        <p>{role}</p> */}
        </UserInfo>
      </Card>

      <Card className={'card projectsCard'}>
        <Projects/>
      </Card>

        <button>+ Create New Project</button>

          {/* <Route
        path={"/dashboard/create-project"}
        render={props => <h1>create project model for project owner</h1>}
      /> */}
    </div>
  );
};
export default ProjectOwner;
