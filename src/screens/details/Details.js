import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './Details.css';

class Details extends Component {

    render() {

        return (
            <div className="details">
                <Header baseUrl={this.props.baseUrl} showBookShowButton="true" />
                <div className="button-back">
                    <Typography>
                        <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>
                <div className="flex-container">
                    <div className="left">

                    </div>

                    <div className="middle">

                    </div>

                    <div className="right">

                    </div>

                </div>
            </div>
        )
    }
}

export default Details;