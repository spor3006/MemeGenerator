import React, { Component } from "react";
import axios from "axios";
class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "",
      allMemeImages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then(json => this.setState({ allMemeImages: json.data.data }));
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const randomnum = Math.floor(
      Math.random() * this.state.allMemeImages.memes.length
    );
    console.log(randomnum);

    const randImg = this.state.allMemeImages.memes[randomnum].url;
    console.log(randImg);

    this.setState({ randomImage: randImg });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Top Text"
            value={this.state.topText}
            name="topText"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            name="bottomText"
            onChange={this.handleChange}
          />
          <button>GEN</button>
        </form>
        <div>
          <img src={this.state.randomImage} alt="" />
          <h2>{this.state.topText}</h2>
          <h2>{this.state.bottomText}</h2>
        </div>
        <br />
      </div>
    );
  }
}
export default MemeGenerator;
