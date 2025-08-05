"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter();



  //later on use react query, loading, error, debouncing
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(password !== confirmPassword){
      alert("Passwords do not match")
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}) //whenever sending data always stringify
      })

      const data = await response.json()
      
      if(!response.ok){
        throw new Error(data.error || "Something went wrong")
      }

      console.log(data)
      router.push("/login")

    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <div>
<h1>
  REGISTER
</h1>

<form onSubmit={handleSubmit}>
  <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
  <button type="submit">Register</button>
</form>

<div>
  <p>Already have an account? <a href="/login">Login</a></p>
</div>

    </div>
  )
}

export default RegisterPage