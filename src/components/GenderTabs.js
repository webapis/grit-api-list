import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";



function LinkTab(props) {
    return (
      <Tab
        component="a"
 
        {...props}
      />
    );
  }
export default function GenderTabs({gender}) {
    const genders =[{gender:'kadin',index:0},{gender:'erkek',index:1},{gender:'kız-çocuk',index:2},{gender:'erkek-çocuk',index:3}]
    const value =  genders.findIndex(f=>decodeURI( f.gender)===decodeURI(gender) )===-1?0: genders.findIndex(f=>decodeURI( f.gender)===decodeURI(gender) )

  return (
    < >
    <Tabs value={value}       variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile >
      <LinkTab label="KADIN"  href="/kadin"/>
      <LinkTab label="ERKEK" href="/erkek" />
      <LinkTab label="KIZ ÇOCUK" href="/kız-çocuk" />
      <LinkTab label="ERKEK ÇOCUK" href="/erkek-çocuk"/>
    </Tabs>
    </>
  );
}
