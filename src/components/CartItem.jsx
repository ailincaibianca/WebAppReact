import React from "react";

export class CartItem extends React.PureComponent {
  render() {
    return (
      <div>
        <img alt="" src={this.props.icon} />
        <div>
          <div>{this.props.name}</div>
          <div>${this.props.price}</div>
          <input
            type="number"
            max="30"
            min="1"
            placeholder="Quantity"
            value={this.props.quantity}
            onChange={({ target }) =>
              this.props.onChange(target.value, this.props.itemId)
            }
          />
        </div>
        <button
          onClick={() => this.props.remove(this.props.itemId)}
          className="cart-button button"
        >
          Remove from cart
        </button>
      </div>
    );
  }
}
