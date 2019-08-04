import React from 'react';

const Categories = ( {filterFromCategory} ) => {
  const categories = [
    {
      'short': 'all',
      'title': 'Все товары',
      'icon': <i className="fa fa-bars"></i>
    },
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
    {
      'short': 'favorites',
      'title': 'Избранные товары',
      'icon': <i className="fa fa-star"></i>
    }
  ];
  return (
    <ul className="list-group">
      {/* Показать все в случае надоедания одной категории */}
      {/* {console.log('sellers', sellers)} */}
      {categories.length > 0 ? categories.map(category => (
        <li className="list-group-item" key={category.short} id={category.short} onClick={filterFromCategory}>{category.icon} {category.title}</li>
      )) : <li className="list-group-item">No categories <i className="fa fa-error"></i></li>}
      
    </ul>
  );
}
 
export default Categories;