import React from 'react'
import { Header, Segment, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import DarkModeToggle from 'utils/DarkModeToggle';

const HeaderFloating = ({ imgBusiness }) => {
  const nameBusiness = process.env.REACT_APP_NAME_BUSINESS;
  return  (
    <>
        <Segment clearing>
          <Link to="/"> 
            <Header as='h4' floated='left'>
                <Image className="logo" src={ imgBusiness } />{ nameBusiness }
            </Header>
          </Link>
          <Header as='h4' floated='right'><Icon name='user'/>Log in</Header>
          <Header as='h4' floated='right'><DarkModeToggle/></Header>
        </Segment>
    </>
    )
}

export default HeaderFloating
