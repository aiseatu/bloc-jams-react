import React from 'react';


const Landing = () => (
  <section className="landing jumbotron jumbotron-fluid mt-5">
    <div className="container">
      <h2 className="hero-title display-5 text-center">Turn the music up!</h2>
      <section className="row selling-points mt-5">
        <div className="col-sm point">
          <h3 className="point-title lead">Choose your music</h3>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div className="col-sm point">
          <h3 className="point-title lead">Unlimited, streaming, ad-free</h3>
          <p className="point-description">No arbitrary limits. No distractions.</p>
        </div>
        <div className="col-sm point">
          <h3 className="point-title lead">Mobile enabled</h3>
          <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </section>
    </div>
  </section>
);

export default Landing;
