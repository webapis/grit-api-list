import Chip from "@mui/material/Chip";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";

export default function TopCategories(props) {
  if(props.catNavData){


  if (!props.params.slug) {
    const { catNavData, params } = props;
    debugger;
    const catItems = catNavData[decodeURI(params.category)].items;
    debugger;

    const values = catItems
      .map((m) => {
        const mappedValue = {
          gender: m.gender,
          groupname: m.groupname,
          ...Object.entries(m.nav)[2],
        };

        return mappedValue;
      })
      .filter((m) => {
        return m[1];
      })
      .sort((a, b) => b[1].count - a[1].count); // Sort by count in descending order

    debugger;

    return (
      <Container>
        {" "}
        <Tabs
          value={10000}
          scrollButtons
          allowScrollButtonsMobile
          variant="scrollable"
        >
          {values.map((m, i) => {
            const category = m[0];
            const count = m[1].count;

            debugger;
            return (
              <Tab
                key={i}
                sx={{ textTransform: "capitalize" }}
                label={
                  <Link
                    key={i}
                    href={`/${m.gender}/${m.groupname}/${category}/sayfa/1`}
                  >
                    <Chip
                      size="medium"
                      label={`${category} (${count})`}
                      variant="outlined"
                    />{" "}
                  </Link>
                }
              />
            );
          })}
        </Tabs>
      </Container>
    );
  }

}else{
  return null
}

}
