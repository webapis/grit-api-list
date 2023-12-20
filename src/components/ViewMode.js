import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import IconButton from '@mui/material/IconButton';
export default function ViewMode(){

    return <div style={{display:'flex'}}>
        
        <IconButton aria-label="delete">
        <ViewModuleIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <ViewCompactIcon />
      </IconButton>
    </div>
}