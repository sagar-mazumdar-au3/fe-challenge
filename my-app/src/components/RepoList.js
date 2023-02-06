import * as React from "react";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import Progress from "./Progress";
import ListItems from "./ListItem";
import ResultsInWeeks from "./ResultStateInWeeks";
import { weekById } from "../constant/appConstant";

export default function RepoList() {
    const selectedWeek = useSelector(state => state?.repo?.selectedWeek);
    const repos = useSelector(state => state?.repo[[weekById[selectedWeek]]]?.repos);
    const isAllDataFetched = useSelector(state => state?.repo[weekById[selectedWeek]]?.isAllDataFetched);

    return (
        <>
            <ResultsInWeeks />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {repos?.map((item) => {
                    return (<ListItems key={item?.id + item?.name } id={item?.id} name={item?.owner?.login} avatar={item?.owner?.avatar_url} repoName={item?.name} description={item?.description} starCount={item?.stargazers_count} issuesCount={item?.open_issues_count} lastPushed={item?.pushed_at} isExpand={item?.expand} />);
                })}
                {!isAllDataFetched && <Progress />}
            </List>
        </>
    );
}
