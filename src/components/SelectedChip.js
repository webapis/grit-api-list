'use client'
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function SelectedChip({count, value}){
const [loading,setLoading]=useState(false)
return <Box><Chip onDelete={()=>{
   setLoading(true)
}}  size='medium'   label={`${value} (${count})`} variant="outlined" color="primary"  />
{loading && <LinearProgress />}
</Box> 
}


export function NotSelectedChip ({count, value,href}){
    const [loading,setLoading]=useState(false)
    return  <Box> <Link  href={href}><Chip size='medium' onClick={()=>{
        setLoading(true)
    }}  label={`${value} (${(count)})`} variant="outlined"  /> </Link>
    {loading && <LinearProgress />}
</Box>
}