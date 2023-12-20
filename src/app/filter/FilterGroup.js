'use client'
import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Chip from '@mui/material/Chip';
import { Typography, Button } from '@mui/material';

export default function FilterGroup ({ groupValues, groupName,handlerFilter,state }) {
  debugger
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'asc' });

  const sortedItems = groupValues.slice().sort((a, b) => {
    const sortOrder = sortBy.order === 'asc' ? 1 : -1;
    if (sortBy.field === 'name') {
      return sortOrder * a.name.localeCompare(b.name);
    } else if (sortBy.field === 'count') {
      return sortOrder * (a.count - b.count);
    }
    return 0;
  });

  const visibleItems = showAll ? sortedItems : sortedItems.slice(0, 10);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const handleSort = (field) => {
    if (sortBy.field === field) {
      setSortBy({ ...sortBy, order: sortBy.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ field, order: 'asc' });
    }
    setShowAll(false);
  };

  return (
    <List
      sx={{ paddingTop: 3 }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography sx={{ textTransform: 'uppercase' }}>{groupName}</Typography>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <IconButton
              onClick={() => handleSort('name')}
              color="primary"
              size="small"
              sx={{ marginRight: '5px' }}
            >
             sirala
              {sortBy.field === 'name' ? (
                sortBy.order === 'asc' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              ) : null}
            </IconButton>
            <IconButton
              onClick={() => handleSort('count')}
              color="primary"
              size="small"
              sx={{ marginRight: '5px' }}
            >
              sirala
              {sortBy.field === 'count' ? (
                sortBy.order === 'asc' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              ) : null}
            </IconButton>
          </div>
        </ListSubheader>
      }
    >
      {visibleItems.map((g, key) => {
        return (
          <ListItem key={key} secondaryAction={<IconButton edge="end"><Chip label={g.count} size='small' /></IconButton>} disablePadding>
            <ListItemButton dense>
              <ListItemIcon>
                <Checkbox edge="start" checked={state[groupName].indexOf(g.name)!==-1}  disableRipple onChange={(e)=>handlerFilter({e,name:g.name,groupName})} />
              </ListItemIcon>
              <ListItemText primary={g.name} />
            </ListItemButton>
          </ListItem>
        );
      })}

      {groupValues.length > 10 && !showAll && (
        <Button onClick={handleShowMore} color="primary">
          Show More
        </Button>
      )}

      {groupValues.length > 10 && showAll && (
        <Button onClick={handleShowLess} color="primary">
          Show Less
        </Button>
      )}
    </List>
  );
}
