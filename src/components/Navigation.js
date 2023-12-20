'use client'


import { useState, useEffect } from 'react';
import { useSearchParams, useRouter,usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
export default function Navigation({ items, limit, title, attribute }) {
  const searchParams = useSearchParams();
  const pathname =usePathname()
  const router = useRouter();

  const currentAttributeQuery = searchParams.getAll(attribute);
  const [selectedItems, setSelectedItems] = useState(currentAttributeQuery);
  const [showAll, setShowAll] = useState(false);
  const [loading,setLoading]=useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Merge the current category changes with other existing categories
    const existingQuery = new URLSearchParams(searchParams.toString());
    existingQuery.delete(attribute);
    const newQuery = new URLSearchParams(existingQuery);
  
    if (selectedItems.length > 0) {
      newQuery.append(attribute, selectedItems.join('-'));
    }
  
    // Replace the entire query with the updated one
    router.push(`?${newQuery.toString()}`);
  }, [selectedItems]);
  const handleToggle = (item) => () => {
    debugger;
    setLoading(true)
    if(decodeURI( pathname).includes(item.name)){
      let prevsegment =decodeURI(pathname).substring(decodeURI(pathname).indexOf(attribute))
   
      debugger
      let urlsegment = `/${decodeURI(pathname).replace('/'+prevsegment,'')}`
     debugger
      window.location.pathname=urlsegment
      
      debugger;
    }
    else{
      debugger;
      const attributePrevIsSet = pathname.indexOf(attribute)
      if(attributePrevIsSet===-1){
        let urlsegment = `/${pathname}/${attribute}/${item.name}`
        window.location.pathname=urlsegment
   
        debugger;
      }
      else{
        debugger;
        let prevsegment =decodeURI(pathname).substring(decodeURI(pathname).indexOf(attribute))
        console.log('prevsegment',prevsegment)
        let urlsegment = `/${decodeURI(pathname).replace(prevsegment,'')}/${prevsegment}-${item.name}`
    
        window.location.pathname=urlsegment
      }

    }
 

    // const selectedIndex = selectedItems.indexOf(item.name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = [...selectedItems, item.name];
    // } else {
    //   newSelected = selectedItems.filter((name) => name !== item.name);
    // }

    // setSelectedItems(newSelected);
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items[attribute].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, limit);

  return (
    <div className="navigation">
      <p>{title}</p>
      {loading &&     
        <Box sx={{ width: '100%' }}>
      <LinearProgress />  </Box>}
      {/* <div className="navigation__controls">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="navigation__search"
        />
      </div> */}
      <ul className="navigation__list">
        {itemsToShow.map((item, i) => (
          <li key={item.name} className="navigation__item">
            <input
              type="checkbox"
              checked={decodeURI(pathname).split('/').findIndex(d=> d==item.name)!==-1}
              onChange={handleToggle(item)}
              className="navigation__checkbox"
            />
            <label htmlFor={i} className="navigation__label">
              {item.name}
            </label>
            <span className="navigation__count">{item.count}</span>
          </li>
        ))}
      </ul>
      {!showAll && filteredItems.length > limit && (
        <button onClick={handleShowMore} className="navigation__button">
          Show More
        </button>
      )}
      {showAll && (
        <button onClick={handleShowLess} className="navigation__button">
          Show Less
        </button>
      )}
      
    </div>
  );
}