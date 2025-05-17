import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer()
{
    return(
        <div>
            <h1>Connect With us</h1>
            <ul>
                <a href="https://github.com/shashankdv1"><li><FontAwesomeIcon icon={faGithub} /> Github</li></a>
            </ul>
        </div>
    );
   
}


export default Footer;