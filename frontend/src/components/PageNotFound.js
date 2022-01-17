import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
function PageNotFound() {
    return (
        <div>
             
             <div class="container">
      <div class="gif">
        <img src="https://2.bp.blogspot.com/-m_ZWnDKS-Nw/XOauDQpO6-I/AAAAAAAzF0E/F-OPcHmjt-o2TWAKjNUL8SNRAAfpIcEgwCLcBGAs/s1600/AW3876169_00.gif" alt="gif_ing" />
      </div>
      <div class="content">
        <h1 class="main-heading">404 Page Not Found</h1>
        <p>
         We can't seem to find the page you are looking for
        </p>
        <Link to="/" target="blank">
          <Button variant='primary'>Back to home </Button>
        </Link>
      </div>
    </div>
        </div>
    )
}

export default PageNotFound
