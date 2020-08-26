export const host: string = process.env.REACT_APP_HOST ?? '';
const bearerToken: string = process.env.REACT_APP_TOKEN ?? '';
export const headers = {
    authorization: `Bearer ${bearerToken}`,
};

const city: string = process.env.REACT_APP_CITY ?? '';
const state: string = process.env.REACT_APP_STATE ?? '';
export const timeZone: string = process.env.REACT_APP_TZ ?? 'America/Chicago';

export default { host, city, state, headers };