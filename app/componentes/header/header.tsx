import Link from "next/link"
import { GiInjustice } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePostAdd } from "react-icons/md"
import { CiBoxList } from "react-icons/ci";
export default function Header(){
    return(
        <div>
          <header className="flex flex-col justify-between items-center w-[300px] text-white fixed h-[800px] bg-[#083344]">
            <nav className="h-[200px]  ">
                <div className="border-b-2 border-gray-600 p-2  flex justify-center items-center">
                    <GiInjustice size={30} className="text-amber-300 mr-2" />
                   <h1 className="text-2xl text-center mt-5"> Dr Israel</h1>
                </div>
                

             <ul className="h-full flex flex-col justify-around">
                <li className=" border-1 p-2 border-gray-600 w-[200px] cursor-pointer hover:bg-blue-600  flex "> <IoMdHome size={20} className="mr-2" /> <Link href="dashboard">Pagina Inicial</Link></li>
                <li className=" border-2 p-2 border-gray-600 w-[200px] cursor-pointer hover:bg-blue-600  flex d text-justify"> <MdOutlinePostAdd className="mr-2" size={20}/> <Link href="postagens">Postagens</Link></li>
                <li className="border-1 p-2 border-gray-600 cursor-pointer hover:bg-blue-600 w-[200px]  flex"><CiBoxList className="text-center mr-2" size={20} /><Link href="">Listas de Postagens</Link></li>
             </ul>
            </nav>
            <div className="w-[200px] mb-10 flex items-center justify-center text-2xl bg-blue-600">
               <Link href="/"><input type="submit" value="Sair" /></Link> 
            </div>
            
               
         </header>
        </div>
        
    )
}