import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = {
    images: []
  };

  componentDidMount() {
    axios
      .get("http://www.localhost:9000/")
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
        .post("http://www.localhost:9000/", { image: reader.result })
        .catch(err => console.log(err));
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div className="App">
        <label>Upload</label>
        <input onChange={this.upload} type="file" />
        <div>
          {this.state.images.map(item => {
            return <img width="500px" height="500px" src={item.image} alt="item" />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
