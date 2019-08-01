import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  productsRequested,
  productsLoaded,
  sellersLoaded,
  addFavoriteProduct
} from "./actions";


function App() {
  const [products, setProducts] = useState([]);
  const [productsLink, setProductsLink] = useState();
  const [sellers, setSellers] = useState([]);
  const [priceFiltered, setPriceFiltered] = useState([]);

  const [sortValue, setSortValue] = useState("");
  const categories = [
    {
      'short': 'auto',
      'title': 'Автомобили',
      'icon': <i className="fa fa-car"></i>
    },
    {
      'short': 'immovable',
      'title': 'Недвижимость',
      'icon': <i className="fa fa-home"></i>
    },
    {
      'short': 'cameras',
      'title': 'Фотокамеры',
      'icon': <i className="fa fa-camera"></i>
    },
    {
      'short': 'laptops',
      'title': 'Ноутбуки',
      'icon': <i className="fa fa-laptop"></i>
    },
  ]

  const getProducts = (url) => {
    setProductsLink(url);

    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        setProducts(json.data);
      })
      .catch(err => console.log(err));
  };

  const getSellers = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        setSellers(json.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch('https://avito.dump.academy/')
      .then(resps => resps.json())
      .then(json => {
        getProducts(json.links.products);
        getSellers(json.links.sellers);
      });
  }, []);

  const formatPrice = (badPrice) => {
    // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') - from stackoverflow
    return badPrice ? badPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : "";
  };

  const filterFromCategory = (category) => {
    if(category === 'all') {
      return getProducts(productsLink);
    }
    setProducts(products.filter(product => product.category === category));
  }

  const handleFilterPrice = (event) => {
    if(/^\d+$/.test(event.target.value) === false) {
      alert("Введите цену в цифрах!")
    }

    if(event.target.id === "from") {
      setPriceFiltered(products.filter(product => product.price > parseInt(event.target.value)));
    } else if(event.target.id === "to") {
      setPriceFiltered(products.filter(product => product.price < parseInt(event.target.value)));
    }
  };

  const handleShowPriceFiltered = () => {
    setProducts(priceFiltered);
  };

  const handleSortChange = (value) => {
    if(value === "popular") {
      return getProducts(productsLink);
    } else if(value === "cheaps") {
      return products.reduce((prev, current) => current.price > prev.price);
    }
  }

  return ( 
    <div className="container" style={{marginTop: '50px'}}>
      <div className="row">
        <div className="col-md-3">
          <ul className="list-group">
            {/* Показать все в случае надоедания одной категории */}
            <li className="list-group-item" onClick={() => filterFromCategory('all')}><i className="fa fa-bars"></i> Все</li>
            
            {categories ? categories.map(category => (
              <li className="list-group-item" onClick={() => filterFromCategory(category.short)}>{category.icon} {category.title}</li>
            )) : <li className="list-group-item">No categories <i className="fa fa-error"></i></li>}
            
            {/* Категория избранных */}
            <li className="list-group-item"><i className="fa fa-star"></i> Избранное</li>
          </ul>
          <div className="price-filter-block">
            <span className="price">Цена</span>
            <div className="price-filter-block-inputs">
              <input id="from" onChange={(e) => handleFilterPrice(e)} type="text" className="price-input" placeholder="от"/>
              <input id="to" onChange={(e) => handleFilterPrice(e)} type="text" className="price-input" placeholder="до"/>
            </div>
            <button className="btn btn-primary" onClick={handleShowPriceFiltered}>Показать {priceFiltered.length} объявлений</button>
          </div>
        </div>
        <div className="col-md-9">
          <ul className="nav">
            <li className="nav-item">
              <h3 className="nav-link ">Сортировать по:</h3>
            </li>
            <li className="nav-item">
            <select value={sortValue} onChange={(e) => handleSortChange(e.target.value)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option>По умолчанию</option>
              <option value="popular">Сначала популярные</option>
              <option value="cheaps">Сначала дешевые</option>
              <option value="expensives">Сначала дорогие</option>
            </select>
            </li>
          </ul>

          <div className="row" style={{marginTop: '30px'}}>
            {products ? (
              products.map(product => (
              <div className="col-md-4 margin-bottom">
                  <div className="card">
                    <div className="card-img-top">
                      <ul className="product-img-sliders">
                        {product.pictures.map(picture => (
                          <li className="product-img-slider">
                            <div className="product-img-block">
                              <img src={picture} alt="" className="product-img"/>
                            </div>
                          </li>)
                        )}
                        
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-price">{formatPrice(product.price)} руб</p>
                      {/* <p className="card-address">{product.address}</p> */}
                      <p className="card-seller">
                        {sellers ? sellers[parseInt(product.relationships.seller)].name : ""}
                        {" "}
                        {sellers ? "("+sellers[parseInt(product.relationships.seller)].rating+")" : ""}
                      </p>
                      {/* <div className="card-rank"></div> */}
                      <button className="btn"><i className="fa fas-heart"></i></button>
                    </div>
                  </div>
                </div>)
              )
            ) : <div className="alert-warning">Problem with "products" array</div>}
            
          </div>
        </div>
      </div>

    </div>
  );
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