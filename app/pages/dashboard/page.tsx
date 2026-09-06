import Header from "@/app/componentes/header/header"
export default function dashboard(){

   async function ListarPostagens(){
       const res = fetch("http://localhost:8080/")
   }


    return(
        <>
        
          <div className="flex justify-between">
            <div className="">
                <Header/>
            </div>
            <div className="flex flex-col mt-20 justify-center items-center w-full  ml-[300px]">
                  <h1 className="font-bold lg:text-3xl text-2xl">Postagens Recentes</h1>

                  <div>
                      
                  </div>
            </div>
          </div>
        
        </>
    )
}