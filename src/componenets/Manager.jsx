import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            setpasswordArray(JSON.parse(password))
        }
    }, [])



    const showpassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/delete.png")) {
            ref.current.src = "icons/eye.png.png"
            passwordRef.current.type = "password"

        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/delete.png"
        }

    }


    const savePassword = (id) => {
        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){

            setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
            setform({ site: "", username: "", password: "" })
            localStorage.setItem("password", JSON.stringify([...passwordArray,  {...form, id: uuidv4()}]))
            console.log(passwordArray([...passwordArray, form]))
            setform({ site: "", username: "", password: "" });
            
            
        }
        else{
            toast('error: password not saved!')
        }
        

    }

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password ? ")
        if(c){

            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            
        }

    }
    const editPassword = (id) => {
        console.log("Editing password with id ", id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
       

    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }



    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

            <div className="p-1 md:p-0 md:mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500 '>&lt;</span>

                    <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password Manager</p>

                <div className=" flex flex-col p-4 text-black gap-8 items-center">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />

                    <div className=" flex flex-col md:flex-row w-full justify-between gap-3">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />

                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showpassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="eye" />
                            </span>

                        </div>


                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 border border-green-900 rounded-full px-2 py-1 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save </button>

                </div>
                <div className="password">
                    <h2 className=' font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden className='py-2'">
                        <thead className="bg-green-800 text-white">
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr>


                                    <td className=' py-2 border border-white text-center w-32 '><a href={item.site} target='_blank'>{item.site}</a>


                                    </td>
                                    <td className=' py-2 border border-white text-center w-32 '>{item.username}</td>
                                    <td className=' py-2 border border-white text-center w-32 '>
                                        {item.password}</td>


                                    <td className=' py-2 border border-white text-center w-32 '>


                                    <span  className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}><lord-icon
                                            src="https://cdn.lordicon.com/lomfljuq.json"
                                            trigger="hover"
                                            style={{"width":"25px", "height":"25px"}}>
                                        </lord-icon></span>

                                        <span className='cursor-pointer mx-2'  onClick={()=>deletePassword(item.id)}><lord-icon
                                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                                            trigger="hover"
                                            style={{"width":"25px", "height":"25px"}}>
                                        </lord-icon></span>

                                      
                                    </td>


                                </tr>


                            })}

                        </tbody>
                    </table>}

                </div>
            </div>

        </>

    )
}

export default Manager
