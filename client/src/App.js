import "./App.css";
import { useState } from "react";
import {
  Container,
  Menu,
  Segment,
  Header,
  Button,
  Checkbox,
  Form,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [activeItem, setActiveItem] = useState("thumbnails");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const fetchAllThumbnails = () => {};

  const uploadImages = () => {
    return (
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  };

  const resizeImages = () => {
    return (
      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
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
          <Menu.Item
            name="upload"
            active={activeItem === "upload"}
            onClick={handleItemClick}
          />
        </Menu>

        <Container text>
          {activeItem === "thumbnails" && <p>Thumnails</p>}

          {activeItem === "resizeImages" && resizeImages()}

          {activeItem === "upload" && uploadImages()}
        </Container>
      </div>
    </div>
  );
}

export default App;
