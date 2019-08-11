export default ({ route, store }) => {
  store.commit('ADD_BREADCRUMB', {
    name: route.name,
  });
};
