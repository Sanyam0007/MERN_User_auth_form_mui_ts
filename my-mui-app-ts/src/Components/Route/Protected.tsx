import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Protected = (props:any) => {
    const navigate = useNavigate()
    const {Component} = props
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    })
  return (
    <div>
        <Component/>
    </div>
  )
}
