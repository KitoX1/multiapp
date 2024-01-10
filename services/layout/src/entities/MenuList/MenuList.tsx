import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@packages/shared';
import { memo } from 'react';

interface Props {
  items: MenuItem[];
}

export const MenuList = memo(({ items }: Props) => (
  <List>
    {items.map((item) => (
      <Link
        key={item.name}
        to={item.link}
      >
        <ListItem sx={{ padding: '0' }}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      </Link>
    ))}
  </List>
));
