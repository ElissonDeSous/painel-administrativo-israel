"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
   const [email,setEmail] = useState("")
   const [password, setPassword] = useState("");
   const [card,setCard] = useState(false)
   const [mensagem,setMensagem] = useState("")
   const [corCard , setCorCard] = useState("")
   const router = useRouter()


  async function  sendForm(e: any){
      e.preventDefault()

      const res = await fetch("http://localhost:8080/session", {
         method:"POST",
         headers:{"Content-Type":"application/json"},
         credentials:'include',
         body: JSON.stringify({email,password})
         
      })

      const dados = await res.json()
      console.log(dados.mensagem)
      if(res.ok){
         
         setMensagem(dados.mensagem)
         setCorCard("sucesso")
         router.push("pages/dashboard")

         setTimeout(()=>{
            setCard(false)
         }, 3000)
      }else{
         
         setCorCard("erro")
         setMensagem(dados.mensagem)

         setTimeout(()=>{
            setCard(false)
         }, 3000)
      }

     
   }
  return (
      <div className="h-full">
         <header className="flex bg-[#083344] justify-center items-center text-white h-[100px]">
              <h1 className="text-3xl">Painel Administrativo Israel Advocacia</h1>
        </header>
         <div className="flex justify-center bg-[#ebebeb] h-[600px] items-center ">
          
            <form onSubmit={sendForm} className="flex mt-10 flex-col justify-around items-center border-1 bg-white  rounded-2xl w-[500px] h-[300px] border-gray-400" action="">
               <h1 className="text-2xl">Realize seu Login</h1>

               <input onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="Digite seu email de acesso" className="pl-5 h-[45px] border-1 border-gray-400 w-[300px]" type="email" name="" id="" />
               <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Digite sua senha para acessar" className="pl-5 h-[45] border-1 border-gray-400 w-[300px]" type="password" name="" id="" />
               <span>  <input onClick={()=>setCard(true)} className="w-[200px] h-[50px] text-white cursor-pointer border-1 rounded-sm border-gray-400 bg-blue-500" type="submit" value="ENTRE" /></span>
              
            </form>
           
 
        { card &&(
            <div className="lg:absolute  left-[1080px] top-[600px]">
              
                    <div className={` ${corCard === "sucesso" ?  "bg-green-500": "bg-red-500"}  w-[400px] h-[100px] flex justify-center items-center text-white text-[18px]`}>
                        {mensagem}
                   </div>
               
             
            </div>
             ) }
         </div>
      </div>
  );
}
