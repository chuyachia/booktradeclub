import React from 'react';

class Footer extends React.Component {
    render(){
        return(
            <div class="footer">
                <span><a href="https://github.com/chuyachia/" target="_blank"><i class="fab fa-github fa-2x text-dark"></i></a></span> 
                <span><a href="mailto:chuyachia@gmail.com"><i class="fas fa-at fa-2x text-dark"></i></a></span>
            </div>
        );
    }
}

export default Footer;