import React, {useState} from 'react'

export default function SayHello() {

  const [count, setCount] = useState(0)
  const [isBlue, setBlue] = useState(false)


 const handleButton = () =>   {
      setCount(count +1)
      setBlue(!isBlue)
  }
 
  return (
    <div>
    <div>sayHello</div>
    <button className={isBlue ? 'blueclass' : ''} onClick={handleButton}>Increment</button>
    <p>{count}</p>
    </div>
  )
}
