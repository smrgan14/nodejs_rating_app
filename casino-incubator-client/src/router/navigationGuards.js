import store from '../store';

const authGuard = async (to, from, next) => {
  const accesTokenValid = await store.dispatch('checkAccesTokenValidation');
  if (accesTokenValid) {
    next();
  } else {
    next('/login');
  }
};

export default authGuard;
