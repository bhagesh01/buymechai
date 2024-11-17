import { uploadToS3 } from '@/actions/UploadAction';
import { SquarePen } from 'lucide-react'
import React from 'react'

const UploadButton = ({onUploadComplete}:{onUploadComplete : (url:string)=> void}) => {

  async function Upload (e: React.ChangeEvent<HTMLInputElement>){
    const target = e.target as HTMLInputElement;
    if(target.files?.length){
        const file = target.files[0];
        const formData = new FormData;
        formData.set('file', file);
        const result = await uploadToS3(formData);
        onUploadComplete(result?.url as string)
    }
  }

  return (
    <label className='bg-gray-300 cursor-pointer rounded-full p-1'>
    <span className='flex items-center justify-center gap-2'><SquarePen /></span>
    <input type="file" className='hidden' onChange={(e)=>{Upload(e)}} />
  </label>
  )
}

export default UploadButton;









