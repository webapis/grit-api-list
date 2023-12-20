import  Button  from '@mui/material/Button';
import Link from 'next/link';
import { Box } from '@mui/material';
export default function NavButton(){

    return  <Box sx={{display:'flex',flexDirection:'column', width:130,height:170, justifyContent:'space-between',marginLeft:{xs:1,sm:10} }}>
    <Button  component={Link}  variant='outlined'  color='inherit' href="/kadin">KADIN</Button>
    <Button   component={Link}  variant='outlined'  color='inherit' href="/erkek">ERKEK</Button>
    <Button  component={Link}  variant='outlined'  color='inherit' href="/kız-çocuk">KIZ ÇOCUK</Button>
    <Button  component={Link}   variant='outlined'  color='inherit' href="/erkek-çocuk">ERKEK ÇOCUK</Button>
    </Box>
}