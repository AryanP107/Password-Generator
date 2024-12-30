import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(0)
  const [password, setPassword] = useState('')
  const [characters, setCharacters] = useState(false)
  const [numbers, setNumbers] = useState(false)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str += "0123456789"
    if(characters) str += "!@#$%^&*()_+"
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,numbers,characters])

  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    generatePassword()
  }, [length, numbers, characters, generatePassword])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <div className='text-white text-center'>Password Generator</div>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        placeholder='Password'
        className='outline-none w-full py-1 px-3'
        readOnly
        ref={passwordRef} />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0' >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>{setLength(e.target.value)}}
           />
           <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {setNumbers}
          id='numberInput'
          onChange={()=>{
            setNumbers((prev) => !prev);
          }}
           />
           <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {setCharacters}
          id='characterInput'
          onChange={()=>{
            setCharacters((prev) => !prev);
          }}
           />
           <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
