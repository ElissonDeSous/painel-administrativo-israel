"use client"
import Header from "@/app/componentes/header/header"
import Editor from "@/app/componentes/EditorTexto/Editor"
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react"
export default function Postagens() {
   const [conteudo, setConteudo] = useState("")
   const [mensagem, setMensagem] = useState("")
   const [styleMsg, setStyleMsg] = useState("")
   const [card, setCard] = useState(false)

   async function editor() {
      const re = await fetch("http://localhost:8080/conteudo", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         credentials: "include",
         body: JSON.stringify({conteudo})
      })

      const dados = await re.json()

      if (re.ok) {
         setMensagem(dados.mensagem)
         setStyleMsg("sucesso")
         setCard(true)
         setTimeout(() => {
            setCard(false)
         }, 3000)
      } else {
         setMensagem(dados.mensagem)
         setCard(true)
         setTimeout(() => {
            setCard(true)
            setStyleMsg("erro")
            setCard(false)
         },3000)
      }
   }



   return (
      <>
         <div className="flex justify-between">
            <div>
               <Header />
            </div>

            <div className="flex flex-col mt-15   w-full  ml-[300px] ">
               <div className="bg-[#ebebeb] h-[700px] p-10 w-full">
               <div className="flex items-center w-[500px] ">
                  <div className="p-2  m-5 bg-blue-500">
                     <FaRegEdit className="text-white" size={50} />
                  </div>
                  <div>
                    <h1 className="text-3xl mt-5 ml-2 font-bold">Criar Postagens</h1>
                    <p className="ml-2">Produza e publique novos conteudos para seu site</p>
                  </div>
                  
                  
               </div>

               <div className="bg-white p-10">
                  <p className="font-bold m-2">Conteudo das Postagens</p>
                <div className="border-1 border-gray-400 rounded-2xl  bg-white   w-full ">
                  <Editor   valor={conteudo}  onchange={setConteudo} />
                  <div  className="flex justify-center items-center m-2">
                  <div onClick={()=> editor()} className="cursor-pointer flex w-[150px] font-bold text-white  h-[50px] justify-center items-center bg-blue-500 cursor-pointer">
                     <button>Enviar</button>
                  </div>
               </div>
               </div>
               </div>

               
               </div>
              

               

               {card && (
                  <div className="fles justify-center items-center w-full">
                     <div className={`${styleMsg === "sucesso" || styleMsg == "erro" ? "bg-green-500" : "bg-red-500"} w-[400px] h-[50px] flex justify-center items-center text-2xl`}>
                        {mensagem}
                     </div>
                  </div>

               )}


            </div>
         </div>
      </>
   )
}