import authReducer from './authReducer'
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    user: userReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer