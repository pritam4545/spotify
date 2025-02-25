import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {

  const [data,setData] = useState([]);

  const fetchAlbums = async () =>{
    try {
      
      const response = await axios.get(`${url}/api/album/list`);

      if(response.data.success){
        setData(response.data.albums)
      }
    } catch (error) {
      toast.error('Error occur')
    }
  }

  const removeAlbum = async (id) =>{
     try {
        const response = await axios.post(`${url}/api/album/remove`,{id});

        if(response.data.success){
          toast.success(response.data.message);
          await fetchAlbums();
        }
     } catch (error) {
        toast.error('Error occur')
     }
  } 

  useEffect(()=>{
      fetchAlbums();
  },[])
  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {data.map((items,index)=>{
          return (
            <div key={index} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
               <img className='w-12 ' src={items.image} alt="" /> 
               <p>{items.name}</p>
               <p>{items.desc}</p>
               <input type="color" value={items.bgColor} />
               <p onClick={()=>removeAlbum(items._id)} className='cursor-pointer'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
