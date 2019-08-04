import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  productsRequested,
  productsLoaded,
  sellersLoaded,
  addFavoriteProduct
} from "./actions";
import Categories from './categories';


function addToFavorite(product) {
  
  let serialObj = JSON.stringify(product);

  return localStorage.setItem(product.id, serialObj);
}

function showProducts(product, formatPrice, sellers) {
  return (
    <div key={product.id} className="col-md-4 margin-bottom">
      <div className="card">
        <div className="card-img-top">
          <ul className="product-img-sliders">
            {product.pictures.map((picture, i) => (
              <li key={i} className="product-img-slider">
                <div className="product-img-block">
                  <img src={picture} alt="" className="product-img"/>
                </div>
              </li>)
            )}
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title"><a href="#">{product.title}</a></h5>
          
          {/* {sellers} */}
          <p className="card-seller">
            {sellers.length > 0 ? sellers[parseInt(product.relationships.seller)].name : ""}
            {" "}
            {sellers.length > 0 ? "("+sellers[parseInt(product.relationships.seller)].rating+")" : ""}
          </p>
          <p className={formatPrice !== "" ? "card-price" : "price-none"}>{formatPrice !== "" ? formatPrice + "руб" : "Нет цены"}</p>
          <p className="favorite" onClick={() => addToFavorite(product)}><i className="far fa-heart"></i></p>
        </div>
      </div>
    </div>        
  )
};

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      sellers: [],
      priceValueFrom: "",
      priceValueTo: "",
      filtered: [],
      sorted: [],
      favorites: [],
      sortValue: "",
    }

    this.formatPrice = this.formatPrice.bind(this);
    this.filterFromCategory = this.filterFromCategory.bind(this);
    this.handleFilterPrice = this.handleFilterPrice.bind(this);
  }

  async componentDidMount() {
    await fetch('https://avito.dump.academy/products')
      .then(resps => resps.json())
      .then(json => {
        this.setState({
          products: json.data
        });
      });

    await fetch('https://avito.dump.academy/sellers')
      .then(resps => resps.json())
      .then(json => {
        this.setState({
          sellers: json.data
        });
      });
    let localStorageValues = [],
        keys = Object.keys(localStorage);
    for(let i = 0; i < keys.length; i++) {
      let item = localStorage.getItem(keys[i]);
      localStorageValues.push(JSON.parse(item));
    }
    this.setState({favorites: localStorageValues});
  }

  formatPrice(badPrice) {
    // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') - from stackoverflow
    return badPrice ? badPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : "";
  };

  filterFromCategory(e){
    if(e.target.id === 'all') {
      this.setState({filtered: this.state.products});
      return;
    }
    let categFilt = this.state.products.filter(prd => prd.category === e.target.id);
    this.setState({filtered: categFilt});
  }

  handleFilterPrice(event){
    console.log("sorted", this.state.sorted)
    const products = this.state.sorted.length ?
                      [...this.state.sorted] :
                      this.state.filtered.length > 0 ?
                      [...this.state.filtered] :
                      [...this.state.products];

    if(/^\d+$/.test(event.target.value) === false && event.target.value != "") {
      alert("Введите цену в цифрах!")
      this.setState({[event.target.id]: ""});

    }
    if(event.target.id === "priceValueFrom") {
      this.setState({
        priceValueFrom: event.target.value,
        filtered: products.filter(product => product.price > parseInt(event.target.value))
      });

    } else if(event.target.id === "priceValueTo") {
      this.setState({
        priceValueTo: event.target.value,
        filtered: products.filter(product => product.price < parseInt(event.target.value))
      });
    }
  };

  handleShowfiltered = () => {
    return;
  };

  handleSortChange = (e) => {
    console.log(e.target.value)
    const { products, filtered, sorted, sellers} = this.state;

    let sortArr = sorted.length > 0 ? sorted : filtered.length > 0 ? filtered : products;
    
    if(e.target.value === "popular") {
      let sellersRating = sellers.sort((a, b) => parseFloat(a.rating - b.rating)).reverse();
      console.log(sellersRating)
      
      this.setState({
        sortValue: e.target.value,
        sorted: popularSort
      })

    } else if(e.target.value === "cheaps") {

      let cheapSort = sortArr.sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0);
      this.setState({
        sortValue: e.target.value,
        sorted: cheapSort
      });

    } else if(e.target.value === "expensive") {

      let expensiveSort = sortArr.sort((a, b) => a.price - b.price).reverse();
      this.setState({
        sortValue: e.target.value,
        sorted: expensiveSort
      });

    }
  }
  render() {
    const {products, sellers, filtered, sorted, sortValue} = this.state;

    return (
      <div className="container" style={{marginTop: '50px'}}>
        <div className="row">
          <div className="col-md-3">
            <Categories filterFromCategory={this.filterFromCategory} />
            <div className="price-filter-block">
              <span className="price">Цена</span>
              <div className="price-filter-block-inputs">
                <input id="priceValueFrom" value={this.state.priceValueFrom} onChange={this.handleFilterPrice} type="text" className="price-input" placeholder="от"/>
                <input id="priceValueTo" value={this.state.priceValueTo} onChange={this.handleFilterPrice} type="text" className="price-input" placeholder="до"/>
              </div>
              <button className="btn btn-primary" onClick={this.handleShowfiltered}>Показать {filtered.length} объявлений</button>
            </div>
          </div>
          <div className="col-md-9">
            <ul className="nav">
              <li className="nav-item">
                <h3 className="nav-link ">Сортировать по:</h3>
              </li>
              <li className="nav-item">
              <select value={sortValue} onChange={this.handleSortChange} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option value="popular">Сначала популярные</option>
                <option value="cheaps">Сначала дешевые</option>
                <option value="expensive">Сначала дорогие</option>
              </select>
              </li>
            </ul>
  
            <div className="row" style={{marginTop: '30px'}}>
              {sorted.length > 0 ? (
                sorted.map(product => (
                  showProducts(product, this.formatPrice(product.price), sellers)
                ))
              ) : filtered.length > 0 ? (
                filtered.map(product => (
                  showProducts(product, this.formatPrice(product.price), sellers)
                ))
              ) : (
                products.map(product => (
                  showProducts(product, this.formatPrice(product.price), sellers)
                ))
              )}
            </div>
          </div>
        </div>
  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
 return {
   products: state.products
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestToUrl: () => dispatch(productsRequested()),
    loadProductsToStore: (products) => dispatch(productsLoaded(products)),
    loadSellersToStore: (sellers) => dispatch(sellersLoaded(sellers)),
    addToFavorites: (favorite) => dispatch(addFavoriteProduct(favorite))
  }
}
export default connect(
  null,
  mapDispatchToProps
)(App);