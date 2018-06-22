import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import React from 'react';

class About extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
         <div class="container">
            <NavBar/>
            <h1 class="display-4">Book Trading Club</h1>
            <div class="row">
            <div class="col-md-12">
            <p>Book trading club is an online community where people exchange second hand books with each other.</p>
            </div>
            <div class="col-md-12">
            <h5>How does it work?</h5>
            </div>
            <div class="col-md-3">
                <div class="card">
                   <div class="card-body text-center">
                    <h5>Log in or create a new account</h5>
                    <i class="fas fa-sign-in-alt fa-3x"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                   <div class="card-body text-center">
                    <h5>Add your books for exchange</h5>
                    <i class="fas fa-plus fa-3x"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                   <div class="card-body text-center">
                   <h5>Browse other users' books</h5>
                   <i class="fas fa-search fa-3x"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                   <div class="card-body text-center">
                    <h5>Make a request for exchange</h5>
                    <i class="far fa-comment-alt fa-3x"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
            <p>Once the two parties agree on an exchange, they can contact each to arrange meetups or book mailings. </p>
            <div class="text-center">
            <Link to="/connect" class="btn btn-secondary btn-lg active text-center" role="button">Try now <i class="fas fa-arrow-alt-circle-right"></i></Link>
            </div>
            </div>
            <div class="col-md-12">
                <h5>Who is behind it?</h5>
                <p>This site is made as part of the freeCodeCamp back-end development certification. Its source codes can be found <a href="https://github.com/chuyachia/booktradeclub" target="_blank">here</a>. Please refer to <a href="https://portfolio-chuya.glitch.me/" target="_blank">my portfolio</a> for my other projects.</p>
            </div>
            </div>
            <Footer/>
        </div>
            )
    }
}

export default About;