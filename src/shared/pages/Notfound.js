import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import React from "react";

var Notfound = ()=>(
        <div class="container">
            <NavBar/>
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-dark">
                      <i class="fas fa-eye fa-lg"></i>&nbsp;404&nbsp;
                      <small class="text-muted">Can't find what you're looking for...</small>
                    </h3>
                </div>
            </div>
            <Footer/>
        </div>    
    );
    
export default Notfound;