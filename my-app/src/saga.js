import { call, takeEvery, put, select, takeLatest } from "redux-saga/effects";
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
    const currentPage = yield select((state)=> state.repo.currentPage);
    const todayDate = '2022-02-03' || new Date().toISOString().slice(0, 10);
    const result = yield call(callAPI, {url: `https://api.github.com/search/repositories?q=created:>${todayDate}&sort=stars&order=desc&page=${currentPage}`});
    if(result.status === 200){

        // console.log("result.data.items", result.data.items)
        yield put(fetchData(result.data.items));

        // increase page number untill all results are fetched
        if(result.data.incomplete_results){
            yield put(nextPage());
        } else {
            yield put(isAllDataFetched());
        }

    } else {
    // yield put({ type: "TODO_FETCH_FAILED" });
    }
  } catch (e) {
    // yield put({ type: "TODO_FETCH_FAILED" });
  }
};

export default function* rootSaga() {
  yield takeLatest(sagaActions.FETCH_REPO_DATA_SAGA, fetchDataSaga);
};