'use client'
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from 'next/navigation'
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon
const SearchBox = (props) => {
  const {slug,gender}=props
  const path =(slug && slug.indexOf('query')!==-1 )? slug.join('/') :''
 // const initialState = path.indexOf('/sayfa')!==-1 ? path.substring(path.indexOf('query')+6,path.indexOf('/sayfa')):path.substring(path.indexOf('query')+6)


  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setTerm(searchTerm);
  };

  const handleSearch = () => {
    if (term) {
      debugger
    
    router.push(`${window.location.origin}/${gender}/search/query/${term}/sayfa/1`);
    
    }
    else{
      
      router.push(`/`);

    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{display:'flex', width:'100%'}}>
    <IconButton onClick={()=>{router.push(`/${gender}`)}}>
      <MenuIcon  /> {/* Add the MenuIcon component */}
    </IconButton>
    <TextField
      sx={{ marginTop: 1 }}
      type="search"
      variant="outlined"
      size="small"
      fullWidth
      value={term}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </div>
  );
};

export default SearchBox;


