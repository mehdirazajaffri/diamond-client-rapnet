import React, { Component } from "react";
import Slider from "react-slick";
import { Parallax, ParallaxBanner } from "react-scroll-parallax";

const ParallaxImage = () => (
  <React.Fragment>
    <Parallax className="custom-class" y={[-10, 20]} tagOuter="figure">
      <img
        style={{ marginTop: "-75px" }}
        className="img-fluid"
        src={require("../assets/img/earrings.jpeg")}
      />
    </Parallax>
    <Parallax className="custom-class" y={[20, 5]} tagOuter="figure">
      <img
        style={{
          marginTop: "-75px",
          position: "absolute",
          right: "-55px",
          bottom: "27px",
          width: "238px"
        }}
        className="img-fluid d-none d-sm-none d-md-block"
        src={require("../assets/img/studs.jpg")}
      />
    </Parallax>
  </React.Fragment>
);

const ParallaxImage2 = () => (
  <ParallaxBanner
    className="your-class"
    layers={[
      {
        image: require("../assets/img/ring3.png"),
        amount: 0.3
      }
    ]}
    style={{
      width: "100%",
      height: "500px"
    }}
  />
);
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <i
      className={className + " material-icons"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      arrow_forward_ios
    </i>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <i
      className={className + " material-icons"}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      arrow_back_ios
    </i>
  );
}
function diamondsRedirect(history) {
  history.push("/diamonds");
  window.scrollTo(0, 0);
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    const settings2 = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    const { history } = this.props;
    return (
      <React.Fragment>
        <div className="home-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <h1 className="hed">
                  Reflect the joy of now with lasting beauty.
                </h1>
                <p>
                  Whether you customize your stone and setting or select from
                  our perfect pre-matched pairs, timeless diamond studs never go
                  out of style.
                </p>
                <a
                  href="javascript:void(0)"
                  className="min-cta mt10"
                  onClick={() => diamondsRedirect(history)}
                >
                  SHOP NOW <i className="material-icons">arrow_forward</i>
                </a>
              </div>
              <div className="col-lg-7">
                <ParallaxImage2 />
              </div>
            </div>
          </div>
        </div>
        <section className="sec-1 text-center">
          <div className="container">
            <h2>Start With A Diamond</h2>
            <Slider className="mt40" {...settings}>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/round.jpeg")} />
                  <span>Round</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/princess.jpeg")} />
                  <span>Princess</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/cushion.jpeg")} />
                  <span>Cushion</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/oval.jpeg")} />
                  <span>Oval</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/emerald.jpeg")} />
                  <span>Emerald</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/pear.jpeg")} />
                  <span>Pear</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/asscher.jpeg")} />
                  <span>Asscher</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/heart.jpeg")} />
                  <span>Heart</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/radiant.jpeg")} />
                  <span>Radiant</span>
                </a>
              </div>
              <div className="diamond-slider text-center">
                <a
                  href="#"
                  onClick={() => this.props.history.push("/diamonds/1")}
                >
                  <img src={require("../assets/img/marquise.jpeg")} />
                  <span>Marquise</span>
                </a>
              </div>
            </Slider>
            <a
              href="#"
              className="mt60 simp-ink"
              onClick={() => this.props.history.push("/diamonds")}
            >
              <span className="v-middle">SEARCH FOR DIAMONDS </span>{" "}
              <i className="material-icons v-middle">chevron_right</i>
            </a>
          </div>
        </section>
        <section className="sec-2 text-center">
          <div className="container">
            <h2>Gifts They'll Love</h2>
            <div className="row mt40">
              <div className="col-lg-4">
                <a href="#">
                  <div className="z-bx">
                    <img
                      src={require("../assets/img/for-him.jpeg")}
                      className="ove-img"
                    />
                    <h4 className="hed">For Him</h4>
                  </div>
                </a>
              </div>
              <div className="col-lg-4">
                <a href="#">
                  <div className="z-bx">
                    <img
                      src={require("../assets/img/for-her.jpeg")}
                      className="ove-img"
                    />
                    <h4 className="hed">For Her</h4>
                  </div>
                </a>
              </div>
              <div className="col-lg-4">
                <a href="#">
                  <div className="z-bx">
                    <img
                      src={require("../assets/img/for-anniversary.jpeg")}
                      className="ove-img"
                    />
                    <h4 className="hed">Anniversary Gifts</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="sec-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <h2>Start With A Setting</h2>
                <p>
                  Select your setting and match it to the perfect diamond. You
                  can get more information on how to select your setting in our
                  education center.
                </p>
                <a href="#" className="mt10 simp-ink">
                  <span className="v-middle">BROWSE ALL</span>
                  <i className="material-icons v-middle">chevron_right</i>
                </a>
              </div>
              <div className="col-lg-7">
                <Slider {...settings2}>
                  <div className="diamond-slider text-center">
                    <a href="#">
                      <img src={require("../assets/img/solitaire.jpg")} />
                      <span>Solitaire</span>
                    </a>
                  </div>
                  <div className="diamond-slider text-center">
                    <a href="#">
                      <img src={require("../assets/img/pave.jpg")} />
                      <span>Pave</span>
                    </a>
                  </div>
                  <div className="diamond-slider text-center">
                    <a href="#">
                      <img src={require("../assets/img/halo.jpg")} />
                      <span>Halo</span>
                    </a>
                  </div>
                  <div className="diamond-slider text-center">
                    <a href="#">
                      <img src={require("../assets/img/channel.jpg")} />
                      <span>Channel</span>
                    </a>
                  </div>
                  <div className="diamond-slider text-center">
                    <a href="#">
                      <img src={require("../assets/img/three_stone.jpg")} />
                      <span>3 Stone</span>
                    </a>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        <section className="sec-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <ParallaxImage />
              </div>
              <div className="col-lg-5 offset-1 align-self-center">
                <h2>A Classic Choice: Diamond Stud Earrings</h2>
                <p>
                  Whether you customize your stone and setting or select from
                  our perfect pre-matched pairs, timeless diamond studs never go
                  out of style.
                </p>
                <a
                  target="_blank"
                  href="https://www.rajjewels.com/jewelry-jewellery/earring-s/diamond-earrings.html"
                  className="mt30 simp-ink"
                >
                  <span className="v-middle">SHOP BUILD YOUR OWN EARRINGS</span>
                  <i className="material-icons v-middle">chevron_right</i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
