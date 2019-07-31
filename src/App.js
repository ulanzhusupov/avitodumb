import React, { useEffect, useState } from 'react';



  
function App() {
  const [products, setProducts] = useState([]);

  const getProducts = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        setProducts(json.data);
      });
  };

  const formatPrice = (badPrice) => {
    // return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') - from stackoverflow
    return badPrice ? badPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "";
    
  };

  useEffect(() => {
    fetch('https://avito.dump.academy/')
      .then(resps => resps.json())
      .then(json => {
        getProducts(json.links.products);
      });
  }, []);

  return ( 
    <div className="container" style={{marginTop: '50px'}}>
      <div className="row">
        <div className="col-md-3">
          <ul className="list-group">
            <li className="list-group-item">Автомобили <i className="fa fa-car"></i></li>
            <li className="list-group-item">Недвижимость <i className="fa fa-home"></i></li>
            <li className="list-group-item">Ноутбуки <i className="fa fa-laptop"></i></li>
            <li className="list-group-item">Фотокамеры <i className="fa fa-camera"></i></li>
            <li className="list-group-item">Избранное <i className="fa fa-star"></i></li>
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
            {console.log("Div", products)}
            {products ? (
              products.map(product => (
              <div className="col-md-4">
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
                      <p className="card-price">{formatPrice(product.price)}</p>
                      {/* <p className="card-address">{product.address}</p> */}
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