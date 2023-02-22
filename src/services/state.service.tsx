export const loggedIn = localStorage.getItem('loggedIn') || false;

export function clearLocalStorage() {
  localStorage.clear();
}

export { }