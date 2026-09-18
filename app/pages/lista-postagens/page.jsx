"use client"
import Header from "@/app/componentes/header/header"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
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
                     <h2 className="text-[25px] font-bold text-gray-600">Gerenciamento de postagens</h2>
                     <p>Gerencie suas postagens aqui, exclua, visualize</p>
                  </div>

                  <div className="bg-white rounded-2xl   w-[1100px] mt-10 p-5 ml-20  flex flex-col items-center  ">
                     <div>
                        <h2 className="text-2xl text-gray-700 mt-2 mb-2 font-bold">Historico de Postagens</h2>
                     </div>

                     <div className="w-full ">
                        <div className="bg-gray-200 font-bold   h-[50px] border-gray-300 rounded-2xl flex justify-around items-center  w-full">
                           <h2 className=" flex justify-center items-center h-full">Imagem</h2>
                           <h2 className=" ] flex  justify-center items-center h-full">Visualizar</h2>
                           <h2 className="  justify-center flex items-center h-full">Excluir</h2>
                        </div>
                        {postagens.map((postagens) => {
                           const imagemConvertida = JSON.parse(postagens.conteudo)
                           const conteudo = reviwe(imagemConvertida)
                           console.log(conteudo.imagem)
                           return (
                           <div key={postagens.Id} className="border-gray-200 border-1 font-bold h-[100px]  rounded-[10px] flex justify-around items-center mb-10 mt-10 w-full">
                            <div className="flex flex-col justify-center items-center ">
                                {
                                 
                                  conteudo.imagem && 
                                   <Image src={conteudo.imagem} className=" m-2 " width={50} height={50} alt="imagem do banco" />
                                     
                                  
                                }
                                </div>
                                 <h2 className=" cursor-pointer hover:text-blue-600  flex  justify-center items-center h-full"><GrView size={20} /></h2>

                                 <h2 onClick={()=>Delete(postagens.Id)} className=" hover:text-red-500 cursor-pointer  justify-center flex items-center h-full"><MdDelete size={20} /></h2>
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