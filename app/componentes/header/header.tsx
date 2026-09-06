import Link from "next/link"
import { GiInjustice } from "react-icons/gi";
export default function Header(){
    return(
        <div>
          <header className="flex flex-col justify-between items-center w-[300px] text-white fixed h-[800px] bg-[#083344]">
            <nav className="h-[400px]  ">
                <div className="border-b-2 border-gray-600 p-2  flex justify-center items-center">
                    <GiInjustice size={30} className="text-amber-300 mr-2" />
                   <h1 className="text-2xl text-center"> Dr Israel</h1>
                </div>
                

             <ul className="h-full flex flex-col justify-around">
                <li className="bg-gray-600 w-[250px] cursor-pointer hover:bg-blue-600 p-2 text-center"><Link href="dashboard">Pagina Inicial</Link></li>
                <li className="bg-gray-600 w-[250px] cursor-pointer hover:bg-blue-600 p-2 text-center"><Link href="postagens">Postagens</Link></li>
                <li className="bg-gray-600 cursor-pointer hover:bg-blue-600 w-[250px] p-2 text-center"><Link href="">Listas de Postagens</Link></li>
             </ul>
            </nav>
            <div className="w-[200px] mb-10 flex items-center justify-center text-2xl bg-blue-600">
               <Link href="/"><input type="submit" value="Sair" /></Link> 
            </div>
            
               
         </header>
        </div>
        
    )
}