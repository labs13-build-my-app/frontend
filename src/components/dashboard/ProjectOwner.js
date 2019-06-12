import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Route } from "react-router";
import Projects from '../projects/Projects';
import placeholder from '../../assets/images/profile-placeholder.png';
import styled from 'styled-components';
import { Button } from '../../styled-components';

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  margin: 20px auto;
  border: 1px solid grey;
  border-radius: 15px;
  box-shadow: lightgrey 15px 15px 15px;
  padding: 5px;
`;

const UserInfo = styled.div`
  width: 50%;
`;

const ProjectOwner = ({ user, role }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    console.log('Use Effect')
    axios({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem('token') 
      },
      url: `http://localhost:8000/api/account/project-owner/project-list`
    })
      .then(res => {
        res.data.message === 'No Projects'
          ? setProjects([])
          : setProjects(res.data)
      })
      .catch(error => {
        console.log('Error', error)
      })
  }, [])

  return (
    <div>
      <Card className={'card userCard'}>
        <div style={{width: '50%'}}>    
          <img 
            src={
              user.profilePictureURL 
                ? user.profilePictureURL
                : placeholder
            } 
            style={{
              borderRadius: '100%', 
              width: '50%',
            }}
          />
        </div>
        <UserInfo>
         <h1>{user.firstName} {user.lastName}</h1>
         <p>{role}</p> 
        </UserInfo>
      </Card>
      {
        projects.length === 0
          ?  <Card className={'card projectsCard'}>
               No Projects
             </Card>
          : projects.map(project => (
              <Card className={'card projectsCard'}>
                  {
                    project.image_url ? 
                    <img src={project.image_url}/>
                    : null}
                <h1>project.name</h1>
                <p>project.description</p>
              </Card>
          )) 
      }
        <Button>+ Create New Project</Button>

          {/* <Route
        path={"/dashboard/create-project"}
        render={props => <h1>create project model for project owner</h1>}
      /> */}
    </div>
  );
};
export default ProjectOwner;
