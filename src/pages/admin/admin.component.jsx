import React from "react";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import { createNewItem } from "../../firebase/firebase.utils";

import "./admin.styles.scss";

class AdminPage extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      type: "",
      price: "",
      imageUrl: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createNewItem(this.state);

      this.setState({
        name: "",
        type: "",
        price: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    console.log(this.state);
  };

  render() {
    const { name, price, imageUrl } = this.state;
    return (
      <div className="admin">
        <h2 className="title">Add item to the shop</h2>
        <form className="add-item-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Item Name"
            required
          />

          {
            // type="text"
            // name="type"
            // value={type}
            // onChange={this.handleChange}
            // label="Type"
            // required
          }

          <FormInput
            type="number"
            name="price"
            value={price}
            onChange={this.handleChange}
            label="Price"
            required
          />
          <FormInput
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleChange}
            label="ImageURL"
            required
          />

          <select name="type" onChange={this.handleChange} required>
            <option value="test">test</option>
            <option value="jackets">Jackets</option>
            <option value="sneakers">Sneakers</option>
            <option value="hats">Hats</option>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
          </select>

          <CustomButton type="submit">ADD ITEM</CustomButton>
        </form>
      </div>
    );
  }
}

export default AdminPage;
