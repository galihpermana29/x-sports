export const getBearerToken = () => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('cms_user')
  ) {
    return JSON.parse(window.localStorage.getItem('cms_user')).token;
  }
};
