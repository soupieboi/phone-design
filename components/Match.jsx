import React from "react";
import Sparkles from "./Sparkles";

export default function Match({ localContent }) {
  const [ isChecked, setIsChecked ] = React.useState(false);
  
  var playerPositionColor = 'yellow-glow bg-yellow-300 bg-opacity-50 border-2 border-yellow-400';

  return (
    <div 
      id='match'
      className='group relative items flex flex-row h-20 border-2 p-1.5 mb-2 border-maincolor-lightest rounded hover:bg-maincolor-lightest cursor-default transition-all duration-100 ease-linear' 
    >
      <div className='matchview-gradient-overlay'>
        <div className='absolute top-0 left-3 flex flex-row z-40 w-1/6 h-full items-center'>
          <img
            alt=""
            src={
              isChecked ?
              '/img/star_filled.svg'
              :
              '/img/star.svg'
            }
            className='w-6 h-6 ml-6 shadow-img opacity-0 group-hover:opacity-100 group-hover:block cursor-pointer transition-all duration-100 ease-linear relative right-3'
            id='add-to-favs'
            onClick={() => {
              if(isChecked) {
                setIsChecked(false);
              } else {
                setIsChecked(true);
              }
            }}
          />
        </div>
      </div>
      
      <div className='mini:w-4/5 w-full flex flex-row'>
        <div id='agent-img'>
          <img alt="Image of Jett" className='w-16 h-16 shadow-img group-hover:opacity-30 transition-all duration-100 ease-linear' src={'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png'} />
        </div>
        <div id='match-info' className='h-full flex flex-col justify-center ml-2'>
          <span className='text-xl'>{localContent.features.item_3.promo_item.map_name}</span>
          <span className='text-base font-light flex flex-row items-center'> 
            <img 
              alt=""
              src={'https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png'} 
              className={'w-7 transform scale-75 shadow-img'}
            />
            <span>{localContent.features.item_3.promo_item.mode_name}</span>
          </span>
        </div>
      </div>
      <div id='match-score' className='w-full hidden flex-row items-center mini:flex'>
        <div id='scoreline' className='flex flex-col text-center w-full'>
          <Sparkles cls={"w-1/2 mx-auto"}>
            <span className={'text-xl text-val-blue'}>{localContent.features.item_3.promo_item.victory_text}</span>
          </Sparkles>
          <span className='text-lg'>13 - 0</span>
        </div>
      </div>
    </div>
  )
}