const host = process.env.REACT_APP_BACK_URL;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getUpcomingMatches = `${host}/api/upcomingMatches`;
export const getPastMatches = `${host}/api/pastMatches`;
export const getAnswerQuestion = `${host}/api/getAnswerQuestion`;