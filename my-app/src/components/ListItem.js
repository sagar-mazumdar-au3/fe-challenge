import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Analytics from './Analytis';
import { expandItemByid } from '../redux/store';
import { useDispatch } from 'react-redux';

export default function ListItems({ id, name, avatar, repoName, description, starCount, issuesCount, lastPushed, isExpand }) {
    const dispatch = useDispatch();

    const expandItem = (id) => {
        dispatch(expandItemByid(id));
    };

    return (<Box sx={{ border: 1, mb: 2 }}> <ListItem onClick={() => { expandItem(id) }} alignItems="flex-start" sx={{ bgcolor: '#eeeeee' ,cursor: 'pointer'}}>
        <ListItemAvatar>
            <Avatar alt={name} src={avatar} sx={{ width: 60, height: 80 }} variant="square" />
        </ListItemAvatar>
        <ListItemText
            sx={{ ml: 2, fontWeight: 'bold' }}
            primary={<b>{repoName}</b>}
            secondary={
                <>
                    <Typography
                        noWrap
                        sx={{ display: 'block', mt: 1, mb: 1 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {description}
                    </Typography>
                    <Typography
                        sx={{ display: 'inline-block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        <Chip variant="outlined" size="small" label={`${starCount} Stars`} />
                    </Typography>
                    <Typography
                        sx={{ display: 'inline-block', ml: 6 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        <Chip variant="outlined" size="small" label={`${issuesCount} Issues`} />
                    </Typography>
                    <Typography
                        sx={{ display: 'inline-block', ml: 6, fontSize: 12 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {`Last pushed ${lastPushed.slice(0, 10)} by ${name}`}
                    </Typography>
                </>
            }
        />
    </ListItem>
        {isExpand && <Analytics />}
    </Box>);
}
