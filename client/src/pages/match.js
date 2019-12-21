import React, { Component } from "react";
import { Container } from '../components/Grid';
import Match from '../components/Match';

class MatchPage extends Component {
    
    render() {
        return (
            <Container>
                    <Match history={this.props.history}/>
            </Container>
        );
    }
}

export default MatchPage;
