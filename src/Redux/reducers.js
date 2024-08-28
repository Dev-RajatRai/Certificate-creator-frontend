import { SET_LINKEDIN_FORM_DATA } from "./actionTypes";
import { SET_UDEMY_FORM_DATA } from "./actionTypes";
import { TOGGLE_UDEMY_PREVIEW } from "./actionTypes";
import { GENERATE_UDEMY_CERTIFICATE_ID } from "./actionTypes";
import { TOGGLE_LINKEDIN_PREVIEW } from "./actionTypes";
import { GENERATE_CERTIFICATE_ID } from "./actionTypes";
import {
  TOGGLE_PREVIEW,
  ADD_ELEMENT,
  UPDATE_ELEMENT,
  REMOVE_ELEMENT,
  SET_ACTIVE_ELEMENT,
  SET_BACKGROUND,
} from "./actionTypes";
import { combineReducers } from "redux";
const elementsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ELEMENT:
      return [...state, action.payload];
    case UPDATE_ELEMENT:
      return state.map((element, index) =>
        index === action.payload.index
          ? { ...element, ...action.payload.updates }
          : element
      );
    case REMOVE_ELEMENT:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

const activeElementReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_ELEMENT:
      return action.payload;
    default:
      return state;
  }
};

const backgroundReducer = (state = null, action) => {
  switch (action.type) {
    case SET_BACKGROUND:
      return action.payload;
    default:
      return state;
  }
};

const previewReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_PREVIEW:
      return !state;
    default:
      return state;
  }
};

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    date: "",
    courseLength: "",
    courseName: "",
  },
  certificateId: "",
  showCertificate: false,
};

export const linkedinCertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LINKEDIN_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case GENERATE_CERTIFICATE_ID:
      return {
        ...state,
        certificateId: action.payload,
      };
    case TOGGLE_LINKEDIN_PREVIEW:
      return {
        ...state,
        showCertificate: !state.showCertificate,
      };
    default:
      return state;
  }
};

const initialUdemyState = {
  formData: {
    firstName: "",
    lastName: "",
    date: "",
    length: "",
    course: "",
    instructor: "",
    certificateNumber: "",
    referenceNumber: "",
  },
  certificateId: "",
  showCertificate: false,
};

export const udemyReducer = (state = initialUdemyState, action) => {
  switch (action.type) {
    case SET_UDEMY_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case GENERATE_UDEMY_CERTIFICATE_ID:
      return {
        ...state,
        certificateId: action.payload,
      };
    case TOGGLE_UDEMY_PREVIEW:
      return {
        ...state,
        showCertificate: !state.showCertificate,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  udemy: udemyReducer,
  linkedinCertificate: linkedinCertificateReducer,
  elements: elementsReducer,
  activeElement: activeElementReducer,
  background: backgroundReducer,
  preview: previewReducer,
});
