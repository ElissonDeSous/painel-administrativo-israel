"use client"
import Header from "@/app/componentes/header/header"
import Image from "next/image"
import { useEffect, useState } from "react"
export default function ListaPostagens() {
   const [postagens, setPostagens] = useState([])

   async function Delete(Id){
         const id = Number(Id)
         const resposta = await fetch(`http://localhost:8080/conteudo/${id}`,{
            method:"DELETE",
            credentials:'include'
         })

         const dados = await resposta.json()
         console.log(dados.mensagem)
   }

   async function ListasPostagens() {
      const response = await fetch("http://localhost:8080/conteudo", {
         credentials: 'include'
      })

      const dados = await response.json()
      console.log(dados)
      setPostagens(dados.dados)
   }

   useEffect(() => {
      ListasPostagens()
   }, [])

   function reviwe(dados) {
      let imagem = null;
      if (imagem) return

      function percorrer(dados) {
         if (dados.type === "image" && !imagem) {
            imagem = dados.attrs.src
         }

         if (dados.content) {
            dados.content.forEach(percorrer)
         }


      }

      percorrer(dados)

      return {
         imagem
      }
   }
   return (
      <>

         <div className="flex justify-between">
            <Header />

            <div className="w-full flex flex-col ml-[300px] items-center">
               <div className="mt-20 w-full flex flex-col items-start h-[800px]  bg-[#ebebeb]">
                  <div className="flex flex-col justify-center items-center mt-10 ml-5 ">
                     <h1 className="text-3xl font-bold text-gray-600">Gerenciamento de postagens</h1>
                     <p>Gerencie suas postagens aqui, exclua, visualize</p>
                  </div>

                  <div className="bg-white rounded-2xl  border-1-left w-full mt-10  flex flex-col items-center  ">
                     <div>
                        <h2 className="text-2xl text-gray-700 mt-5 font-bold">Historico de Postagens</h2>
                     </div>

                     <div className="w-full ">
                        <div className="bg-gray-200 font-bold   h-[50px] border-gray-300 rounded-2xl flex justify-around items-center  w-full">
                           <h1 className=" flex justify-center items-center h-full">Imagem</h1>
                           <h1 className=" ] flex  justify-center items-center h-full">Visualizar</h1>
                           <h1 className="  justify-center flex items-center h-full">Excluir</h1>
                        </div>
                        {postagens.map((postagens) => {
                           const imagemConvertida = JSON.parse(postagens.conteudo)
                           const conteudo = reviwe(imagemConvertida)
                           console.log(conteudo.imagem)
                           return (
                           <div key={postagens.Id} className="border-gray-400 border-1 font-bold   rounded-[10px] flex justify-around items-center mb-10  w-full">
                            <div className="flex flex-col justify-center items-center h-full">
                                {
                                 
                                  conteudo.imagem && 
                                   <Image src={conteudo.imagem} className=" m-2 " width={80} height={80} alt="imagem do banco" />
                                     
                                  
                                }
                                </div>
                                 <h1 

                                  className="   flex  justify-center items-center h-full">Visualizar</h1>
                                 <h1 onClick={()=>Delete(postagens.Id)} className=" cursor-pointer  justify-center flex items-center h-full">Excluir</h1>
                              </div>
                              
                           )
                        })

                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </>
   )
}