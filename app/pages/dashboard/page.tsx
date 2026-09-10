"use client"
import { BiSolidBookContent } from "react-icons/bi";
import Header from "@/app/componentes/header/header"
import { useEffect, useState } from "react"
export default function dashboard(){

    const [Usuario, setUsuario] = useState("") 
    
   async function ListarUsuario(){
       const res = await fetch("http://localhost:8080/detalhes",{
        credentials:'include'
       })
       const usuario = await res.json()
       setUsuario(usuario)
       console.log(usuario)
   }

 useEffect(()=>{
    ListarUsuario()
 }, [])


    return(
        <>
        
          <div className="flex justify-between">
            <div className="">
                <Header/>
            </div>
            <div className="flex flex-col mt-20  w-full bg-[#ebebeb] ml-[300px]">
                <div className="ml-[100px] flex flex-col ">
                 { Usuario && (
                  <h1 className="font-bold mt-10  lg:text-3xl text-gray-600 text-2xl">Olá {Usuario.Name}</h1>
                )}
                <p> Bem-vindo ao painel administrativo do seu site, aqui  pode você criar e gerenciar suas postagens</p>
                </div>
                
                  <div className="flex ml-[100px] m-2 ">
                      <div className="mt-10 p-5 w-[400px] h-[130px] rounded-2xl flex flex-col bg-white">
                          <h2 className="flex items-center"> <BiSolidBookContent className="mr-5" size={50} /> Total de postagens</h2>
                          <h2 className="text-violet-600 text-3xl p-2 w-[150px] flex justify-center">0</h2>
                      </div>
                  </div>

                  <div className="flex flex-col  ml-[100] mb-10 rounded-[10px]  bg-white mr-10">
                      <h2 className="text-center m-2 text-2xl text-gray-600 font-bold">Postagens Recentes</h2>

                      <div>
                        <div className="flex items-center h-[50px] justify-around m-5 bg-gray-200">
                            <h3 className=" font-bold w-[100px] h-[30px] flex justify-center items-center p-2">Imagem</h3>
                            <h3 className=" font-bold w-[100px] h-[30px] flex justify-center items-center p-2">Titulo</h3>
                            <h3 className="font-bold w-[100px] h-[30px] flex justify-center items-center p-2">Conteudo</h3>
                        </div>
                      </div>

                  </div>

            </div>
          </div>
        
        </>
    )
}