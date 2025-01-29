/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const Face = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);

  useEffect(()=>{ 
    setFilterProducts(products)
  },[])
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t px-4 sm:px-8 lg:px-16">
      <div className="sm:min-w-60 w-full sm:w-1/4">
        {/* Main Brand Section */}
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={() => setShowFilter(!showFilter)}>FILTERS
          <img className={`h-3 sm:hidden rotate-180 transition-transform ${showFilter ? 'rotate-270' : ''}`} src={assets.back} alt=""/>
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">BRANDS</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Dior'} />DIOR
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Estee Lauder'} />ESTEE LAUDER
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Armani Beauty'} />ARMANI BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bobbi Brown'} />BOBBI BROWN
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Chanel'} />CHANEL
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Charlotee Tilbury'}/>CHARLOTEE TILBURY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Fenty Beauty'} />FENTY BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Hermes Beauty'} />HERMES BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Huda Beauty'} />HUDA BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Lancome'} />LANCOME
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Pat McGrath Labs'}/>PAT MCGRATH LABS
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Rare Beauty'} />RARE BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Tomford Beauty'}/>TOMFORD BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Valentino Beauty'}/>VALENTINO BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Westman Atelier'}/>WESTMAN ATELIER
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'YSL Beauty'} />YSL BEAUTY
            </p>
          </div>
        </div>
        {/* Sub Category Section */}
        <div className={`border border-gray-300 pl-5 py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Face'} />FACE
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Eyes'} />EYES
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Lips'} />LIPS
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Tools'} />TOOLS & MAKEUP SETS
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">FACE</h2>
        {/* Product Sort */}
        <select className='border-2 border-gray-300 text-sm px-2'>
        <option value="relavent">Sort by: Relavent</option>
        <option value="low-high">Sort by: Low to High</option>
        <option value="high-low">Sort by: High to Low</option>
        </select>
        </div>
      {/* Map Products */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>{
        filterProducts.map((item,index)=>(
          <ProductItem key={index} name= {item.name} id={item._id} price={item.price} image={(item.image)}/>
        ))
        }
        
      </div>
      </div>
    </div>
  );
};

export default Face;
