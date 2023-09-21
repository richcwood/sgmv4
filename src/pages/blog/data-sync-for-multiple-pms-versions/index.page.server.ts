export function onBeforeRender() {
  return {
    pageContext: {
      documentProps: {
        title: `Don't let PMS upgrades break your data sync`, 
        description: 'See how you can design data sync jobs that stay ahead of practice management software upgrades' 
      }
    }
  };
}
