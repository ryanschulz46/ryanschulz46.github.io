import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ReactGA from "react-ga4";
import { type ISourceOptions } from "@tsparticles/engine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import particlesConfig from './assets/particles.json';
import particlesConfigMobile from './assets/particles-mobile.json';
import image from "./images/sfportrait.webp"
import './App.css'

const App = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(engine => loadSlim(engine))
      .then(() => setInit(true));
  }, []);

  const particlesLoaded = async (): Promise<void> => {
    console.log("Loaded Particles");
  };

  const options: ISourceOptions = useMemo(
    () => {
      const touch = matchMedia('(hover: none)').matches;
      console.log("isTouchDevice: ", touch);
      const config = touch ? particlesConfigMobile : particlesConfig;
      return config as ISourceOptions
    },
    [],
  );

  // Handler to open LinkedIn and track click
  const openLinkedIn = () => {
    ReactGA.event({ category: 'Outbound', action: 'Click', label: 'https://www.linkedin.com/in/ryanschulz46', transport: "beacon"});
    window.open("https://www.linkedin.com/in/ryanschulz46", "_blank", "noopener");
  };

  if (!init) return null;

  return (
    <>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <div className="scale-wrapper">
        <div className="container">
          <div className="card">

            <img
              src={image}
              alt="Portrait in San Francisco, CA"
              className="centerimage"
            />

            <h1 className="ssp upper">Ryan Schulz</h1>
            <h3 className="ssp lower">Software Developer</h3>
            <h3 className="ssp lower">New York City</h3>
            <div className="iconContainer">
              <FontAwesomeIcon
                className="icon center"
                icon={faLinkedin}
                size="4x"
                onClick={openLinkedIn}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;