import React from 'react';

function RenderProduct({ product, formatPrice, sellers }) {

  const [style, setStyle] = React.useState({});

  const addToFavorite = (product) => {
    let serialObj = JSON.stringify(product);
    return localStorage.setItem(product.id, serialObj);
  }

  return (
    <div key={product.id} className="col-md-4 margin-bottom">
      <div className="card">
        <div className="card-img-top">
          <ul className="product-img-sliders">
            {product.pictures.map((picture, i) => (
              <li key={i} className="product-img-slider" onMouseOver={setStyle({opacity: '1'})}>
                <div className="product-img-block"style={style}>
                  <img src={picture} alt="" className="product-img"/>
                  <i className="fas fa-arrow-left"></i>
                  <i className="fas fa-arrow-right"></i>
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

export default RenderProduct;