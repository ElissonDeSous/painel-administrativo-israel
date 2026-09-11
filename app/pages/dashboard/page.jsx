"use client"
import { BiSolidBookContent } from "react-icons/bi";
import Header from "@/app/componentes/header/header"
import { useEffect, useState } from "react"
import Image from "next/image";
export default function dashboard(){

    const [Usuario, setUsuario] = useState("") 
    const [postagens, setPostagens] = useState([])
    const [count, setCount] = useState(0)
    
   async function ListarUsuario(){
       const res = await fetch("http://localhost:8080/detalhes",{
        credentials:'include'
       })
       const usuario = await res.json()
       setUsuario(usuario)
       console.log(usuario)
   }

   async function  listarConteudo (){
       const res = await fetch("http://localhost:8080/conteudo", {
            credentials:'include'
       })

       const dados = await res.json()
       
       
       setPostagens(dados.dados)
       console.log(dados.dados)
       console.log(dados.dados.length)
       setCount(dados.dados.length)
       
   }

   function ReviweConteudo(node){
       let texto = ""
       let imagem = null;

       function percorrer(node){
          if (!node) return

          if(node.type === "text"){
              texto += node.text + " "
          }

          if(node.type === "image" && !imagem){
              imagem = node.attrs?.src;
          }
          if(node.content){
            node.content.forEach(percorrer)
          }
       }
    percorrer(node)

    return{
        texto: texto.trim(),
        imagem
    }
    
   }

   

 useEffect(()=>{
    ListarUsuario()
    listarConteudo()
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
                
                  <div className="flex ml-[100px] m-5">
                      <div className="mt-10 p-5 w-[400px] h-[130px] rounded-2xl flex flex-col bg-white">
                          <h2 className="flex items-center"> <BiSolidBookContent className="mr-5" size={50} />total de postagens</h2>
                          <h2 className="text-violet-600 text-3xl p-2 w-[150px] flex justify-center">{count}</h2>
                      </div>
                  </div>

                  <div className="flex flex-col justify-center  ml-[100] mb-10 rounded-[10px]  bg-white mr-10">
                      <h2 className="text-center m-2 text-2xl text-gray-600 font-bold">Postagens Recentes</h2>

                      <div className="flex flex-col justify-center">
                        <div className="flex items-center h-[50px]  justify-around m-5 bg-gray-200">
                            <h3 className=" font-bold w-[100px] h-[30px] flex justify-center items-center p-2">Imagem</h3>
                            <h3 className=" font-bold w-[100px] h-[30px] flex justify-center items-center p-2">Conteudo</h3>
                            <h3 className="font-bold w-[150px] h-[30px] flex justify-center items-center p-2">Autor</h3>
                        </div>
                        { postagens.map((postagens) =>{
                                const content = JSON.parse(postagens.conteudo)
                                const conteudo = ReviweConteudo(content)

                                console.log(conteudo)
                            return (
                             <div key={postagens.Id} className="flex m-5 border-1 justify-around  items-center h-[150px]  justify-around border-gray-200 ">
                                { conteudo.imagem &&
                              <Image className="mt-5 border-1" width={100} height={100} src = {conteudo.imagem} alt="imagem vinda do banco de dados"/>}
                            <h3 className=" font-bold w-[250px] m-5   flex justify-center items-center p-2">{conteudo.texto.slice(0,70)}</h3>
                            <h3 className="font-bold  w-[200px] h-[30px] flex justify-center items-center p-2">{Usuario.Name}</h3>
                            </div>
                            )
                        })
                       
                       }
                      </div>

                  </div>

            </div>
          </div>
        
        </>
    )
}