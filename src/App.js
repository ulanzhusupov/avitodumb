import React, { useEffect, useState } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  const [productsLink, setProductsLink] = useState("");
  const [favourites, setFavourites] = useState([]);

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
    fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then(resp => resp.json())
      .then(json => {
        setProducts(json.data);
      });
  };

  useEffect(() => {
    fetch('https://avito.dump.academy/')
      .then(resps => resps.json())
      .then(json => {
        setProductsLink(json.links.products);
        getProducts(productsLink);
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
              <input type="text" className="price-input" placeholder="от"/>
              <input type="text" className="price-input" placeholder="до"/>
            </div>
            <button className="btn btn-primary">Показать</button>
          </div>
        </div>
        <div className="col-md-9">
          <ul className="nav">
            <li className="nav-item">
              <h3 className="nav-link ">Сортировать по:</h3>
            </li>
            <li className="nav-item">
            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>По умолчанию</option>
              <option value="Сначала популярные">Сначала популярные</option>
              <option value="Сначала дешевые">Сначала дешевые</option>
              <option value="Сначала дорогие">Сначала дорогие</option>
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
                      {/* <p className="card-seller"></p> */}
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
 
export default App;