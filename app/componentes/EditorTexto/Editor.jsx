"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import Image from "@tiptap/extension-image"

import { useState } from "react"

import { ImParagraphCenter } from "react-icons/im";
import { MdOutlineTitle } from "react-icons/md";
import { FaBold } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";



export default function Editor({ valor, onchange }) {




       const criarImagem  = async (e)  =>{
        e.preventDefault()
           const file =  e.target.files[0]

            if(!file) return

            const form = new FormData();

            form.append("file", file)

            const res = await fetch("http://localhost:8080/img", {
                 method:"POST",
                 credentials:"include",
                 body:form
            })

            const data = await res.json()
            console.log(data.imagem)


            editor.chain().focus().setImage({src:data.imagem}).run()

            
            
          }

   
             
    

    const editor = useEditor({
        extensions: [StarterKit, Heading.configure({
            levels: [1, 2, 3]
        }), Image],
        content: valor,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onchange(editor.getJSON())
        }
    })

    return (
        <>
            <div className="w-full bg-[#ededed] h-[50px] border-b-1 rounded-2xl border-gray-400 flex justify-around items-center ">
                <p onClick={() => editor?.chain().focus().setParagraph().run()} className=" font-bold   cursor-pointer "><ImParagraphCenter size={30} /></p>
                <p onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className="  font-bold cursor-pointer "><MdOutlineTitle size={30} />
                </p>
                <p onClick={() => editor?.chain().focus().setBold().run()} className="cursor-pointer font-bold "><FaBold size={30} /></p>

             <label className="cursor-pointer"  htmlFor="imagens">
                  <CiImageOn size={50}/>
             </label>

              <input   className="border-1 hidden border-gray-500 pl-10 rounded-2xl mt-2 w-[300px] cursor-pointer hover:bg-blue-500" onChange={criarImagem}  type="file" name="" id="imagens"/>
                
            </div>

            <EditorContent  placeholder="Digite o Conteudo" className="border-1 border-gray-400 mt-5" editor={editor} />
        </>


    )


  
}