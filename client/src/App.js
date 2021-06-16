import "./App.css";
import { useState, useEffect } from "react";
import "./index.css";
import {
  Container,
  Menu,
  Button,
  Grid,
  Form,
  Card,
  Segment,
  Select,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

function App() {
  const [activeItem, setActiveItem] = useState("thumbnails");
  const [formstate, setFormstate] = useState({
    filename: "",
    width: 0,
    height: 0,
  });

  const [thumbnails, setThumnails] = useState([]);

  const countryOptions = [
    { key: "danceforme", value: "danceforme", text: "Dance For Me" },
    { key: "jake", value: "jake", text: "Jake" },
    { key: "chase", value: "chase", text: "Chase" },
    { key: "picturethis", value: "picturethis", text: "Picture This" },
    { key: "sonny", value: "sonny", text: "Sonny" },
    { key: "soda", value: "soda", text: "Soda" },
  ];

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
    const { filename, width, height } = formstate;
    const url = `http://localhost:3001/api/images?filename=${filename}&height=${width}&width=${height}`;
    const response = await fetch(url, {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      window.location = "/";
    } else {
      toast({
        title: "Error",
        type: "error",
        icon: "envelope",
        description: <p>Processed image is too large for the JPEG format</p>,
      });
    }
  };

  useEffect(displayThumbnails, []);

  const resizeImage = (e) => {
    e.preventDefault();
    resizeImageAPI();
  };

  return (
    <div className="App">
      <SemanticToastContainer />
      <div>
        <Menu>
          <Menu.Item
            name="thumbnails"
            active={activeItem === "thumbnails"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="generateThumbnails"
            active={activeItem === "generateThumbnails"}
            onClick={handleItemClick}
          />
        </Menu>

        <Container>
          {activeItem === "thumbnails" && (
            <Grid>
              <Grid.Row columns="three">
                {thumbnails &&
                  thumbnails.map((tn, i) => {
                    return (
                      <Grid.Column key={i} style={{ marginTop: "2rem" }}>
                        <Card>
                          <img src={tn} alt="" style={{ paddingTop: "4rem" }} />
                        </Card>
                      </Grid.Column>
                    );
                  })}
              </Grid.Row>
            </Grid>
          )}

          {activeItem === "generateThumbnails" && (
            <Segment>
              <Form>
                <Form.Field>
                  <label>File Name</label>
                  <Select
                    placeholder="Select your country"
                    options={countryOptions}
                    onChange={(e, data) => {
                      setFormstate({
                        ...formstate,
                        filename: data.value,
                      });
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Width</label>
                  <input
                    placeholder="Width"
                    type="number"
                    onChange={(e) => {
                      setFormstate({
                        ...formstate,
                        width: e.target.value,
                      });
                    }}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Height</label>
                  <input
                    placeholder="Height"
                    type="number"
                    onChange={(e) => {
                      setFormstate({
                        ...formstate,
                        height: e.target.value,
                      });
                    }}
                  />
                </Form.Field>

                <Button type="submit" onClick={resizeImage}>
                  Resize Image
                </Button>
              </Form>
            </Segment>
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
