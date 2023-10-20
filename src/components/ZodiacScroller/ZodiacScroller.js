import './ZodiacScroller.css';
import { ZODIAC_IMG } from '../../constants/images';

const ZodiacScroller = () => {
  return (
    <div className='wrapper'>
      <div className='track'>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Rat']} alt='Rat'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Buffalo']} alt='Buffalo'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Tiger']} alt='Tiger'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Cat']} alt='Cat'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Dragon']} alt='Dragon'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Snake']} alt='Snake'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Horse']} alt='Horse'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Goat']} alt='Goat'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Monkey']} alt='Monkey'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Rooster']} alt='Rooster'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Dog']} alt='Dog'/>
        </div>
        <div className='zodiac'>
          <img src={ZODIAC_IMG['Pig']} alt='Pig'/>
        </div>
      </div>
    </div>
  )
}

export default ZodiacScroller;