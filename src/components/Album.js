import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component{
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0,
      isPlaying: false,
      isHovering: false,
      isPaused: false,
      hoveredSong: album.songs[0],
      pausedSong: album.songs[0]
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumecontrol: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumecontrol', this.eventListeners.volumecontrol);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause(song) {
    this.audioElement.pause();
    this.setState({ isPlaying: false, isPaused: true, pausedSong: song});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  formatTime(time) {
    if(typeof time === 'number'){
      const intTime = time.toFixed(0);
      const numSeconds = intTime % 60;
      const numMinutes = (intTime - numSeconds)/60;
      return numMinutes.toString() + ":" + numSeconds.toString();
    } else {
      return "-:--";
    }
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const trackLength = this.state.album.songs.length;
    const newIndex = Math.min(trackLength - 1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  hover(song) {
    this.setState({ isHovering: true, hoveredSong: song });
  }

  unhover() {
    this.setState({ isHovering: false});
  }

  handleButton(song, index) {
    const isHoverSong = this.state.hoveredSong === song;
    const isPlayingSong = this.state.currentSong === song;
    ///const isPausedSong = this.state.pausedSong === song;
    if(this.state.isPlaying && isPlayingSong){
      return <span className="icon ion-md-pause"></span>
    } else if (this.state.isHovering && isHoverSong) {
      return <span className="icon ion-md-play"></span>
    } else if (this.state.isPaused && isPlayingSong) {
      return <span className="icon ion-md-play"></span>
    } else {
      return index+1;
    }
  }

  render(){
    return(
      <section className="album row mt-5">
        <div className="col-sm-4">
          <section className="card" id="album-info">
            <img className="card-img-top img-fluid mr-3" height="200" width="200" id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <div className="album-details card-body">
              <h4 id="album-title">{this.state.album.title}</h4>
              <h5 className="artist">{this.state.album.artist}</h5>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
        </div>
        <table className="col " id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={()=> this.hover(song)} onMouseLeave={() => this.unhover()}>
                  <td>{ this.handleButton(song, index) }</td>
                  <td>{song.title}</td>
                  <td>{song.duration} seconds</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.formatTime(this.audioElement.currentTime)}
          duration={this.formatTime(this.audioElement.duration)}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

export default Album;
