import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';

class Library extends Component {
  constructor(props){
    super(props);
    this.state = { albums: albumData };
  }
  render(){
    return(
      <section className='container library mt-5'>
        {
          this.state.albums.map( (album, index) =>
            <Link className="media mt-5" to={`/album/${album.slug}`} key={index}>
              <img className="img-fluid mr-3"src={album.albumCover} alt={album.title} height="300" width="300"/>
              <div className="media-body ml-5">
                <h3>{album.title}</h3>
                <div>{album.artist}</div>
                <div>{album.songs.length} songs</div>
              </div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;
