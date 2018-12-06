import React, { Component } from 'react';


class PlayerBar extends Component {
  render() {
    return (
      <div className="container mt-5">
        <section className="player-bar d-flex flex-row justify-content-center">
          <section className="p-2" id="buttons">
            <button id="previous" onClick={this.props.handlePrevClick}>
              <span className="icon ion-md-skip-backward"></span>
            </button>
            <button id="play-pause" onClick={this.props.handleSongClick}>
              <span className={this.props.isPlaying ? 'icon ion-md-pause' : 'icon ion-md-play'}></span>
            </button>
            <button id="next" onClick={this.props.handleNextClick}>
              <span className="icon ion-md-skip-forward"></span>
            </button>
          </section>
          <section id="time-control" className="p-2">
            <div className="row">
              <div className="current-time col col-sm-auto">{this.props.currentTime}</div>
              <input
                type="range"
                className="seek-bar col col-sm-auto"
                value={(this.props.currentTime / this.props.duration) || 0}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleTimeChange}
              />
              <div className="total-time col col-sm-auto">{this.props.duration}</div>
            </div>
          </section>


          <section id="volume-control" className="p-2">
            <div className="row">
              <div className="icon ion-md-volume-low col col-sm-auto"></div>
              <input
                type="range"
                className="seek-bar col col-sm-auto"
                value={this.props.volume}
                max="1"
                min="0"
                step="0.01"
                onChange={this.props.handleVolumeChange}
              />
              <div className="icon ion-md-volume-high col col-sm-auto"></div>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default PlayerBar;
