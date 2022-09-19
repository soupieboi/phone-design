import React from "react";
import { Star, StarFilled } from "./SVGs";

export default function StoreItem({ itemName }) {
  const [ isWishlisted, setIsWishlisted ] = React.useState(false);

  return(
    <div 
      id={'item-box'}
      className='group h-52 w-full relative bg-maincolor-lightest mr-2 rounded shadow-lg transition-all duration-100 ease-in'
    >
      <div className='absolute bottom-4 left-4 flex flex-row items-center'>
        {
          isWishlisted === true ?
          <StarFilled 
            color
            cls='w-6 h-6 shadow-img opacity-0 group-hover:opacity-100 group-hover:block cursor-pointer transition-all duration-100 ease-linear' 
            click={() => {
              setIsWishlisted(false);
            }} 
          />
          :
          <Star 
            color
            cls='w-6 h-6 shadow-img opacity-0 group-hover:opacity-100 group-hover:block cursor-pointer transition-all duration-100 ease-linear'
            click={() => {
              setIsWishlisted(true);
            }} 
          />
        }
      </div>
      <span className='absolute top-2 z-20 left-2 text-lg'>{itemName}</span>
      <div className='flex w-full h-full items-center justify-center mt-3 z-10'>
        <img alt="Image of Reaver Vandal" src={'https://media.valorant-api.com/weaponskinchromas/2bd28382-48c6-8579-83e8-e9b64b783de3/displayicon.png'} className={'w-4/5 drop-shadow-2xl transition-opacity duration-100 ease-in floaty'} />
      </div>
      <div 
        id='item-price'
        className='text-xl text-gray-300 flex flex-row items-center absolute bottom-4 right-4 bg-opacity-60 rounded bg-black  px-2 py-1'
      >
        <span id="wallet-vp" className='relative top-px'>1775</span>
        <img src="/img/vp_icon.png" alt="" className='w-7 ml-2' />
      </div>
    </div>
  )
}