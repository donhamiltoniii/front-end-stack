import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { getRandomJoke } from '../api';
import { GET_JOKE, getJokeSucceed, getJokeFailed } from '../actions';

export function* getJokeAsync() {
  try {
    const response = yield call(getRandomJoke);
    const json = yield response.json();

    yield put(getJokeSucceed(json.value.joke));
  }
  catch (e) {
    yield put(getJokeFailed(e.message));
  }
}

// Unlike `takeLatest`, which allows concurrent get jokes, `takeLatest` ensures if GET_JOKE
// gets dispatched while a fetch is already pending, that pending fetch is cancelled
// and only the latest one will be run.
export default function*() {
  yield* takeLatest(GET_JOKE, getJokeAsync);
}
