"use client"
import Header from "@/app/componentes/header/header"
export default function ListaPostagens(){
    return(
       <>
       
       <div className="flex justify-between">
          <Header/>

          <div className="w-full flex flex-col ml-[300px] items-center">
                <div className="mt-20 w-full flex flex-col items-start h-[800px]  bg-[#ebebeb]">
                    <div className="flex flex-col justify-center items-center mt-10 ml-5 ">
                        <h1 className="text-3xl font-bold text-gray-600">Gerenciamento de postagens</h1>
                        <p>Gerencie suas postagens aqui, exclua, visualize</p>
                    </div>

                    <div className="bg-white rounded-2xl h-[300px] border-1-left w-full mt-10  flex flex-col items-center  ">
                       <div>
                          <h2 className="text-2xl text-gray-700 mt-5 font-bold">Historico de Postagens</h2>
                       </div>

                       <div className="w-full">
                          <div className="bg-gray-200 font-bold   h-[50px] border-gray-300 rounded-2xl flex justify-around items-center  w-full">
                              <h1 className=" flex justify-center items-center h-full">Imagem</h1>
                              <h1 className=" ] flex  justify-center items-center h-full">Visualizar</h1>
                              <h1 className="  justify-center flex items-center h-full">Excluir</h1>
                          </div>
                       </div>
                    </div>
                </div>
          </div>
       </div>

       </>
    )
}