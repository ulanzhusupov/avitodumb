import React, {useEffect} from 'react';

function getProducts(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
}

const App = () => {
  let productsLink = "";
  useEffect(() => {
    fetch('https://avito.dump.academy/')
      .then(resps => resps.json())
      .then(json => {
        productsLink = json.links.products;
        getProducts(productsLink);
      });
  }, [])
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
          <ul class="nav">
            <li class="nav-item">
              <h3 class="nav-link ">Сортировать по:</h3>
            </li>
            <li class="nav-item">
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
              <option selected>По умолчанию</option>
              <option value="Сначала популярные">Сначала популярные</option>
              <option value="Сначала дешевые">Сначала дешевые</option>
              <option value="Сначала дорогие">Сначала дорогие</option>
            </select>
            </li>
          </ul>

          <div className="row" style={{marginTop: '30px'}}>
            <div className="col-md-4">
              <div class="card">
                <div class="card-img-top">
                  <ul className="product-img-sliders">
                    <li className="product-img-slider">
                      <div className="product-img-block">
                        <img src="https://loremflickr.com/cache/resized/65535_48136294382_65ac01f286_z_400_400_nofilter.jpg" alt="" className="product-img"/>

                      </div>
                    </li>
                    <li className="product-img-slider">
                      <div className="product-img-block">
                        <img src="https://loremflickr.com/cache/resized/65535_46991597014_0aa986de0f_z_400_400_nofilter.jpg" alt="" className="product-img"/>
                      </div>
                    </li>
                    <li className="product-img-slider">
                      <div className="product-img-block">
                        <img src="https://loremflickr.com/cache/resized/65535_48228214407_4f6a8567f5_z_400_400_nofilter.jpg" alt="" className="product-img"/>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
 
export default App;