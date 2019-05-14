import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    images: []
  };

  componentDidMount() {
    axios
      .get("https://bofa-imges.herokuapp.com/")
      .then(res => {
        this.setState({ images: res.data });
      })
      .catch(err => console.log(err));
  }

  upload = element => {
    var file = element.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log("RESULT", reader.result);
      axios
        .post("https://bofa-imges.herokuapp.com/", { image: reader.result })
        .catch(err => console.log(err));
    };
    reader.readAsDataURL(file);
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <label>Upload</label>
        <input onChange={this.upload} type="file" />
        <div>
          {this.state.images.map(item => {
            return <img key={item.id} width="500px" height="500px" src={item.image} alt="item" />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
