/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const Face = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] =useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev=> [...prev, e.target.value])
    }
  }

  const togglesubCategory = (e)=> {

    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev=> [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy =products.slice();

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () =>{

    let fpCopy = filterProducts.slice();

    switch(sortType){
      case'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price -b.price)));
      break;
      case'high-low':
      setFilterProducts(fpCopy.sort((a,b)=>(b.price -a.price)));
      break;
      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{ 
    applyFilter();
  },[category,subCategory])

  useEffect(()=>{ 
   sortProduct()
  },[sortType])

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
              <input className="w-3" type="checkbox" value={'Dior'} onChange={toggleCategory} />DIOR
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Estee Lauder'} onChange={toggleCategory} />ESTEE LAUDER
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Armani Beauty'} onChange={toggleCategory} />ARMANI BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bobbi Brown'} onChange={toggleCategory}/>BOBBI BROWN
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Chanel'}onChange={toggleCategory} />CHANEL
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Charlotee Tilbury'}onChange={toggleCategory}/>CHARLOTEE TILBURY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Fenty Beauty'}onChange={toggleCategory} />FENTY BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Hermes Beauty'} onChange={toggleCategory}/>HERMES BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Huda Beauty'}onChange={toggleCategory} />HUDA BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Lancome'} onChange={toggleCategory}/>LANCOME
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Pat McGrath Labs'}onChange={toggleCategory}/>PAT MCGRATH LABS
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Rare Beauty'}onChange={toggleCategory} />RARE BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Tomford Beauty'}onChange={toggleCategory}/>TOMFORD BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Valentino Beauty'}onChange={toggleCategory}/>VALENTINO BEAUTY
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Westman Atelier'}onChange={toggleCategory}/>WESTMAN ATELIER
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'YSL Beauty'}onChange={toggleCategory}/>YSL BEAUTY
            </p>
          </div>
        </div>
        {/* Sub Category Section */}
        <div className={`border border-gray-300 pl-5 py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Face'} onChange={togglesubCategory}/>FACE
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Eyes'}onChange={togglesubCategory} />EYES
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Lips'} onChange={togglesubCategory}/>LIPS
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Tools'} onChange={togglesubCategory}/>TOOLS & MAKEUP SETS
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">FACE</h2>
        {/* Product Sort */}
        <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
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
