import { call, put, select, takeLatest } from "redux-saga/effects";
import Axios from "axios";
import { fetchData, nextPage, isAllDataFetched } from "./app/store";
import { sagaActions } from "./sagaAction";

const callAPI = async ({ url, method, data }) => {
    return await Axios({
        url,
        method,
        data
    });
};

export function* fetchDataSaga() {
    try {
        debugger;

        const selectedWeek = yield select((state) => state.repo.selectedWeek);
        console.log("selectedWeek", selectedWeek)

        let currentPage = 3; // initialized with 3 bcoz we intially fetch for 30 days
        if (selectedWeek === 3) {
            currentPage = yield select((state) => state.repo.oneMonth.currentPage);
        } else if (selectedWeek === 2) {
            currentPage = yield select((state) => state.repo.twoWeeks.currentPage);
        } else {
            currentPage = yield select((state) => state.repo.oneWeek.currentPage);
        }

        let url = "";
        if (selectedWeek === 3) {
            const todayDate = new Date(); // Response with current date is empty array so using previous day
            const yesterday = "2022-05-05" || new Date(todayDate.setDate(todayDate.getDate() - 1)).toISOString().slice(0, 10);
            url = `https://api.github.com/search/repositories?q=created:>${yesterday}&sort=stars&order=desc&page=${currentPage}`;
        } else if(selectedWeek === 2){
            const todayDate = new Date().toISOString().slice(0, 10);
            const preForteenthDay = new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().slice(0, 10);
            url = `https://api.github.com/search/repositories?q=created:${preForteenthDay}..${todayDate}&sort=stars&order=desc&page=${currentPage}`;
        } else {
            const todayDate = new Date().toISOString().slice(0, 10);
            const preSeventhDay = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10);
            url = `https://api.github.com/search/repositories?q=created:${preSeventhDay}..${todayDate}&sort=stars&order=desc&page=${currentPage}`;
        }
        const result = yield call(callAPI, { url });
        if (result.status === 200) {

            // console.log("result.data.items", result.data.items)
            yield put(fetchData(result.data.items));

            // increase page number untill all results are fetched
            if (result.data.incomplete_results) {
                yield put(nextPage());
            } else {
                yield put(isAllDataFetched());
            }

        } else {
            // yield put({ type: "REPO_FETCH_FAILED" }); // Other than 200 status fail case logic goes here 
        }
    } catch (e) {
        // yield put({ type: "REPO_FETCH_FAILED" }); // Api fail case logic goes here 
    }
};

export default function* rootSaga() {
    yield takeLatest(sagaActions.FETCH_REPO_DATA_SAGA, fetchDataSaga);
};