import { useState } from 'react'
import Checkbox from './Checkbox'

function App() {
  const [formData, setFormData] = useState ({
    upperCase: true,
    lowerCase: true,
    number: true,
    symbol: false
  })

  const [generatedPassword, setGeneratedPassword] = useState ('click to generate')

  const [value, setValue] = useState(10)

  const passwordData = [{
    value: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"], condition:formData.upperCase},
    {
    value: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],condition:formData.lowerCase},
    {
    value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], condition:formData.number},{
    value:  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "-", ".", "`", "~", "|", "<", ">", "=", "-", "_"], condition:formData.symbol}
  ]

  const getBackgroundSize = () => {
    return {backgroundSize: `${(value * 50) / 10}% 100%`}
  }

  function toggleCheckbox(e){
    const {name, checked } = e.target
    setFormData(prevData => ({...prevData, [name] : checked}))
  }

  function generatePassword(){
    const na = Array.from(Array(value).keys())
    const a = passwordData.filter(i => i.condition)
    const uc = Array.from(Array(a.length).keys()).map((i,n) => i === i ? a[n].value : i)
    const ac = na.map(i => uc.map(i => i[Math.floor(Math.random() * i.length)])).flat(1)
    const fnl = na.map(i => ac[i]).sort(() => Math.random() - 0.5).join('')
    setGeneratedPassword(fnl)
  }

  const strenght = [formData.upperCase, formData.lowerCase, formData.number, formData.symbol].filter(i => i === true).length

  return (
    <div className='container'>
      <p className='title'>Password Generator</p>
      <div className='password'>{generatedPassword}<span onClick={() =>  navigator.clipboard.writeText(generatedPassword)}><i className="fa-regular fa-copy"></i></span></div>
      <div className='options'>
        <div className='form'>
          <div  className='label'>
            <label htmlFor="slider">Character Length</label><span>{value}</span>
          </div>
          <input type="range" name='slider' id="slider" max={20} value={value} onChange={(e) => setValue(e.target.valueAsNumber)} style={getBackgroundSize()} />
          <br />
          <Checkbox label='Include Uppercase Letters' isChecked={formData.upperCase} name='upperCase' toggle={toggleCheckbox} />
          <Checkbox label='Include Lowercase Letters' isChecked={formData.lowerCase} name='lowerCase' toggle={toggleCheckbox} />
          <Checkbox label= 'Include Numbers' isChecked={formData.number} name='number' toggle={toggleCheckbox} />
          <Checkbox label= 'Include Symbols' isChecked={formData.symbol} name='symbol' toggle={toggleCheckbox} />
        </div>
        <div className='strenght'>
          <p>STRENGHT</p>
          <div className='strenght-bar'>
           {strenght === 1 && <p>WEAK</p>}
           {value < 8 && strenght !== 1 && <p>WEAK</p>}
           {strenght > 1 && strenght < 4 && value >= 8  && <p>MEDIUM</p>}
           {strenght > 1 && strenght === 4 && value <=9 && value > 7 && <p>MEDIUM</p>}
           {strenght === 4 && value >= 10 && <p>STRONG</p>}
            <div className={strenght >= 1 ? 'bar-strenght' : ''}></div>
            <div className={strenght >= 2 ? 'bar-strenght' : ''}></div>
            <div className={strenght >= 3 ? 'bar-strenght' : ''}></div>
            <div className={strenght === 4 && value >= 10 ? 'bar-strenght' : ''}></div>
          </div>
        </div>
        <button onClick={generatePassword}>GENERATE<span><i className="fa-solid fa-arrow-right"></i></span></button>  
      </div>
    </div>
  )
}

export default App