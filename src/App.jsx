import React from "react";
import "./App.css";
import { Item } from "./components/Item";
import { CartItem } from "./components/CartItem";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {} from "@fortawesome/free-solid-svg-icons";

export default class App extends React.Component {
  originItems = [
    {
      icon: "images/orange.png",
      name: "Oranges",
      type: "Fruits",
      price: 2.12,
    },
    {
      icon: "images/potato.png",
      name: "Potato",
      type: "Vegetables",
      price: 0.99,
    },
    {
      icon: "images/tomatoes.png",
      name: "Tomatoes",
      type: "Fruits",
      price: 2.46,
    },
    {
      icon: "images/apples.jpg",
      name: "Apples",
      type: "Fruits",
      price: 1.59,
    },
    {
      icon: "images/garlic.png",
      name: "Garlic",
      type: "Vegetables",
      price: 1.29,
    },
    {
      icon: "images/watermelon.png",
      name: "Watermelon",
      type: "Fruits",
      price: 2.68,
    },
    {
      icon: "images/grapes.png",
      name: "Grapes",
      type: "Fruits",
      price: 3.45,
    },
    {
      icon: "images/spinach.png",
      name: "Spinach",
      type: "Vegetables",
      price: 1.39,
    },
    {
      icon: "images/corn.png",
      name: "Corn",
      type: "Vegetables",
      price: 2.39,
    },
    {
      icon: "images/mango.png",
      name: "Mango",
      type: "Fruits",
      price: 4.96,
    },
    {
      icon: "images/peach.png",
      name: "Peach",
      type: "Fruits",
      price: 2.73,
    },
    {
      icon: "images/blueberries.png",
      name: "Blueberries",
      type: "Fruits",
      price: 4.64,
    },
    {
      icon: "images/strawberries.png",
      name: "Strawberries",
      type: "Fruits",
      price: 4.39,
    },
    {
      icon: "images/leek.png",
      name: "Leek",
      type: "Vegetables",
      price: 2.99,
    },
    {
      icon: "images/peas.png",
      name: "Peas",
      type: "Vegetables",
      price: 1.79,
    },
    {
      icon: "images/onion.png",
      name: "Onion",
      type: "Vegetables",
      price: 0.82,
    },
    {
      icon: "images/avocado.png",
      name: "Avocado",
      type: "Fruits",
      price: 3.49,
    },
    {
      icon: "images/greenOnion.png",
      name: "Green Onion",
      type: "Vegetables",
      price: 1.31,
    },
    {
      icon: "images/coconut.png",
      name: "Coconut",
      type: "Fruits",
      price: 5.47,
    },
    {
      icon: "images/melon.png",
      name: "Melon",
      type: "Fruits",
      price: 2.11,
    },
    {
      icon: "images/pepper.png",
      name: "Pepper",
      type: "Vegetables",
      price: 1.99,
    },
    {
      icon: "images/carrots.png",
      name: "Carrots",
      type: "Vegetables",
      price: 2.26,
    },
    {
      icon: "images/sweetPotato.png",
      name: "Sweet potato",
      type: "Vegetables",
      price: 3.34,
    },
    {
      icon: "images/blackberry.png",
      name: "Blackberries",
      type: "Fruits",
      price: 6.49,
    },
  ];

  filterTypes = ["All", "Fruits", "Vegetables"];

  sortBy = ["Our Picks", "Price (low first)", "Price (high first)"];

  constructor(props) {
    super(props);

    this.originItems = this.originItems.map((item, index) => ({
      ...item,
      id: index,
    }));

    this.state = {
      items: this.originItems,
      itemsCart: [],
      selectedFilter: 0,
      selectedSort: 0,
    };
  }

  updateItems = () => {
    const selectedFilter = this.filterTypes[this.state.selectedFilter];
    const selectedSort = this.sortBy[this.state.selectedSort];

    let items = this.originItems.filter((item) =>
      selectedFilter === "All" ? true : item.type === selectedFilter
    );

    if (selectedSort !== "Our Picks") {
      switch (selectedSort) {
        case "Price (low first)":
          items.sort((a, b) => a.price - b.price);
          break;
        case "Price (high first)":
          items.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    this.setState({
      items,
    });
  };

  renderItems = () => {
    return this.state.items.map((item) => (
      <Item
        key={item.id}
        itemId={item.id}
        addToCart={this.addToCart}
        editProduct={this.editProduct}
        icon={item.icon}
        name={item.name}
        type={item.type}
        price={item.price}
      />
    ));
  };

  renderCart = () => {
    return this.state.itemsCart.map((itemInfo) => {
      const itemC = this.originItems.find((item) => item.id === itemInfo.id);
      return (
        <CartItem
          key={itemC.id}
          remove={this.removeFromCart}
          onChange={this.onQuantityChange}
          itemId={itemC.id}
          icon={itemC.icon}
          name={itemC.name}
          type={itemC.type}
          price={itemC.price}
          quantity={itemInfo.quantity}
        />
      );
    });
  };

  //ADD METHOD
  addToCart = (itemId) => {
    const cartItem = this.state.itemsCart.find((item) => item.id === itemId);
    if (cartItem) {
      this.onQuantityChange(cartItem.quantity + 1, itemId);
      return;
    }

    const itemToAdd = this.originItems.find((item) => item.id === itemId);
    if (itemToAdd) {
      const cartUpdated = [
        ...this.state.itemsCart,
        {
          id: itemToAdd.id,
          quantity: 1,
        },
      ];

      this.setState({ itemsCart: cartUpdated });
    }
  };

  //QUANTITY METHOD
  onQuantityChange = (newValue, id) => {
    const cartItem = this.state.itemsCart
      .map((item, index) => ({
        index,
        item,
      }))
      .find((itemData) => itemData.item.id === id);

    if (cartItem) {
      const items = this.state.itemsCart;

      const numberValue = parseInt(newValue);
      if (!Number.isNaN(numberValue)) {
        items[cartItem.index].quantity = numberValue;
      }

      this.setState({ itemsCart: items });
    }
  };

  //EDIT METHOD
  editProduct = (itemId) => {
    const itemToAdd = this.originItems
      .map((item, index) => ({
        index,
        item,
      }))
      .find((itemData) => itemData.item.id === itemId);
    if (!itemToAdd || !itemToAdd.item) {
      return;
    }

    const image = prompt("Image:", itemToAdd.item.icon);
    if (!image) {
      return;
    }

    const name = prompt("Name:", itemToAdd.item.name);
    if (!name) {
      return;
    }

    const type = prompt("Type:", itemToAdd.item.type);
    if (!type) {
      return;
    }

    const price = prompt("Price:", itemToAdd.item.price);
    if (!price) {
      return;
    }

    itemToAdd.item.icon = image;
    itemToAdd.item.name = name;
    itemToAdd.item.type = type;
    itemToAdd.item.price = price;

    this.originItems[itemToAdd.index] = itemToAdd.item;
    this.updateItems();
  };

  //REMOVE METHOD
  removeFromCart = (itemId) => {
    const cartUpdated = this.state.itemsCart.filter(
      (item) => item.id !== itemId
    );

    this.setState({ itemsCart: cartUpdated });
  };

  //FILTER-TYPE
  onFilterClick = (id) => {
    this.setState({
      selectedFilter: id,
    });
  };

  //SORT-PRICE
  onSortClick = (id) => {
    this.setState({
      selectedSort: id,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedFilter !== this.state.selectedFilter ||
      prevState.selectedSort !== this.state.selectedSort
    ) {
      this.updateItems();
    }
  }

  //TOTAL PRICE
  totalPrice = () => {
    return this.state.itemsCart
      .reduce((a, b) => {
        const itemData = this.state.items.find((x) => x.id === b.id);
        if (!itemData) {
          return a;
        }

        return a + itemData.price * b.quantity;
      }, 0)
      .toFixed(2);
  };

  //PURCHASE BUTTON
  purchase = () => {
    alert("Thank you for your purchase");
    this.setState({
      itemsCart: [],
    });
  };

  render() {
    return (
      <div>
        <div className="header">
          <div>Our products</div>
          <div>
            {this.filterTypes.map((filter, index) => (
              <div
                className={this.state.selectedFilter === index ? "active" : ""}
                key={index}
                onClick={() => this.onFilterClick(index)}
              >
                {filter}
              </div>
            ))}
          </div>
          <div className="sort-elements">
            <div>Sort by:</div>
            {this.sortBy.map((sort, index) => {
              return (
                <div key={index}>
                  <input
                    checked={this.state.selectedSort === index ? true : false}
                    onChange={() => this.onSortClick(index)}
                    type="radio"
                    id={sort}
                    name="sort"
                    value="true"
                  />
                  <label htmlFor={sort}>{sort}</label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container">
          <div className="items">{this.renderItems()}</div>
        </div>
        <div>
          <div className="cart-title">CART</div>
          <div className="items-cart">{this.renderCart()}</div>
        </div>
        <div className="footer">
          <div className="totalPrice">Total: ${this.totalPrice()}</div>
          <button className="purchase-button" onClick={() => this.purchase()}>
            PURCHASE
          </button>
        </div>
      </div>
    );
  }
}
