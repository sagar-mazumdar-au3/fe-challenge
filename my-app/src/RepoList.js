import * as React from 'react';
import List from '@mui/material/List';
import { useSelector } from "react-redux";
import Progress from './Progress'
import ListItems from './ListItem'
export default function RepoList() {
    const repos = useSelector(state => state.repo.repos);
    const isAllDataFetched = useSelector(state => state.repo.isAllDataFetched);


    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {repos.map((item) => {
                return (<ListItems key={item.id} id={item.id} name={item?.owner?.login} avatar={item.owner.avatar_url} repoName={item.name} description={item.description} starCount={item.stargazers_count} issuesCount={item.open_issues_count} lastPushed={item.pushed_at} isExpand={item?.expand}/>);
            })}
            {!isAllDataFetched && <Progress />}
        </List>
    );
}
