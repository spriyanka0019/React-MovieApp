import React, { Component } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import './Details.css';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                genres: [],
                trailer_url: "",
                artists: []
            },
            starIcons: [
                {
                    id: 1,
                    stateId: "star1",
                    color: "black"
                },
                {
                    id: 2,
                    stateId: "star2",
                    color: "black"
                },
                {
                    id: 3,
                    stateId: "star3",
                    color: "black"
                },
                {
                    id: 4,
                    stateId: "star4",
                    color: "black"
                },
                {
                    id: 5,
                    stateId: "star5",
                    color: "black"
                }]
        }
    }

    render() {
        let movie = this.state.movie;
        const opts = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }

        return (
            <div className="details">
                <Header baseUrl={this.props.baseUrl} showBookShowButton="true" />
                <div className="button-back">
                    <Typography>
                        <Link to="/">  &#60; Back to Home</Link>
                    </Typography>
                </div>
                <div className="flex-container">
                    <div className="left-detail">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>

                    <div className="middle-detail">
                        <div>
                            <Typography variant="headline" component="h2">{movie.title} </Typography>
                        </div>
                        <br />
                        <div>
                            <Typography>
                                <span className="bold">Genres: </span> {movie.genres.join(', ')}
                            </Typography>
                        </div>
                    </div>

                    <div className="right-detail">
                        <Typography>
                            <span className="bold">Rate this movie: </span>
                        </Typography>
                    </div>

                </div>
            </div>
        )
    }
}

export default Details;