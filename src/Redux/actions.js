import { ADD_QR_CODE, GENERATE_CERTIFICATE_ID } from "./actionTypes";
import { SET_UDEMY_FORM_DATA } from "./actionTypes";
import { TOGGLE_UDEMY_PREVIEW } from "./actionTypes";
import { GENERATE_UDEMY_CERTIFICATE_ID } from "./actionTypes";
import { TOGGLE_LINKEDIN_PREVIEW } from "./actionTypes";
import { SET_LINKEDIN_FORM_DATA } from "./actionTypes";
import {
  ADD_ELEMENT,
  UPDATE_ELEMENT,
  REMOVE_ELEMENT,
  SET_ACTIVE_ELEMENT,
  SET_BACKGROUND,
  TOGGLE_PREVIEW,
} from "./actionTypes";

export const addElement = (element) => ({
  type: ADD_ELEMENT,
  payload: element,
});

export const updateElement = (index, updates) => ({
  type: UPDATE_ELEMENT,
  payload: { index, updates },
});

export const removeElement = (index) => ({
  type: REMOVE_ELEMENT,
  payload: index,
});

export const setActiveElement = (index) => ({
  type: SET_ACTIVE_ELEMENT,
  payload: index,
});

export const setBackground = (background) => ({
  type: SET_BACKGROUND,
  payload: background,
});

export const togglePreview = () => ({
  type: TOGGLE_PREVIEW,
});

export const setLinkedInFormData = (formData) => ({
  type: SET_LINKEDIN_FORM_DATA,
  payload: formData,
});

export const generateCertificateId = () => {
  const rand1 = Math.floor(Math.random() * 9) + 1;
  const rand2 = Math.floor(Math.random() * 9) + 1;
  const certificateId = `AU${rand1}IZ${rand2}a${rand2}rPeUmO_IE${rand1}R${rand1}0L${rand1}ac${rand2}sN`;
  return {
    type: GENERATE_CERTIFICATE_ID,
    payload: certificateId,
  };
};

export const toggleLinkedInPreview = () => ({
  type: TOGGLE_LINKEDIN_PREVIEW,
});

export const setUdemyFormData = (formData) => ({
  type: SET_UDEMY_FORM_DATA,
  payload: formData,
});

export const generateUdemyCertificateId = () => {
  const rand1 = Math.floor(Math.random() * 9) + 1;
  const rand2 = Math.floor(Math.random() * 9) + 1;
  const certificateId = `UD${rand1}ID${rand2}a${rand2}rPeUmO_IE${rand1}R${rand1}0L${rand1}ac${rand2}sN`;
  return {
    type: GENERATE_UDEMY_CERTIFICATE_ID,
    payload: certificateId,
  };
};

export const toggleUdemyPreview = () => ({
  type: TOGGLE_UDEMY_PREVIEW,
});

export const addQRCode = (data) => ({
  type: ADD_QR_CODE,
  payload: data,
});
