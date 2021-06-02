import "./App.css";
import { useState, useEffect } from "react";
import {
  Container,
  Menu,
  Button,
  Checkbox,
  Form,
  Card,
  Segment,
  Select
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [activeItem, setActiveItem] = useState("thumbnails");
  const [formstate, setFormstate] = useState({
    filename: '',
    width: 0,
    height: 0
  });


  const [thumbnails, setThumnails] = useState([]);

  const countryOptions = [
    { key: 'danceforme', value: 'danceforme', text: 'danceforme' },
    { key: 'picturethis', value: 'picturethis', text: 'picturethis' },
  ]

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const fetchAllThumbnails = async () => {
    const url = "http://localhost:3001/api/thumbnails";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
  };

  const displayThumbnails = () => {
    fetchAllThumbnails().then((response) => {
      setThumnails(response.thumbnails);
    });
  };

  const resizeImageAPI = async () => {
    const {filename, width, height} = formstate
    const url = `http://localhost:3001/api/images?filename=${filename}&height=${width}&width=${height}`;
    const response = await fetch(url, {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
      },
    });
    if(response.status === 200) {
      window.location = "/";
    }
  };

  useEffect(displayThumbnails, []);


  const resizeImage = (e) => {
    e.preventDefault();
    resizeImageAPI()

  };

  return (
    <div className="App">
      <div>
        <Menu>
          <Menu.Item
            name="thumbnails"
            active={activeItem === "thumbnails"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="resizeImages"
            active={activeItem === "resizeImages"}
            onClick={handleItemClick}
          />
        </Menu>

        <Container>
          {activeItem === "thumbnails" && (
            <div>
              {thumbnails &&
                thumbnails.map((tn, i) => {
                  return (
                    <div key={i}>
                      <Card>
                        <img src={tn} alt="" />
                      </Card>
                    </div>
                  );
                })}
            </div>
          )}

          {activeItem === "resizeImages" && (
            <Segment>
              <Form>
              <Form.Field>
                <label>File Name</label>
                <Select placeholder='Select your country' options={countryOptions} onChange={(e, data) =>{
                    setFormstate({
                      ...formstate,
                      filename: data.value,
                     
                    })
                }} />
              </Form.Field>
              <Form.Field>
                <label>Width</label>
                <input placeholder="Width" type="number" onChange={(e) =>{
                  setFormstate({
                    ...formstate,
                    width: e.target.value,
                    
                  })
                }} />
              </Form.Field>

              <Form.Field>
                <label>Height</label>
                <input placeholder="Height" type="number" onChange={(e) =>{
                  setFormstate({
                    ...formstate,
                    height: e.target.value
                    
                  })
                }} />
              </Form.Field>
             
              <Button type="submit" onClick={resizeImage}>Submit</Button>
              </Form>
            </Segment>
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
