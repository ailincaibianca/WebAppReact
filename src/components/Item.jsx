import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEdit } from "@fortawesome/free-solid-svg-icons";

export class Item extends React.PureComponent {
  render() {
    return (
      <div>
        <img alt="" src={this.props.icon} />
        <div>{this.props.name}</div>
        <div>{this.props.type}</div>
        <div>${this.props.price}</div>
        <button
          className="button"
          onClick={() => this.props.addToCart(this.props.itemId)}
        >
          <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        </button>
        <button
          className="button button-edit"
          onClick={() => this.props.editProduct(this.props.itemId)}
        >
          <FontAwesomeIcon className="icon" icon={faEdit} />
        </button>
      </div>
    );
  }
}
