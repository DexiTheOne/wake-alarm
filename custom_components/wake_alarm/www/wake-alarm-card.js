/** Wait for HA's scoped-element polyfill before importing Lit or registering cards. */
const version = "0.7.5";
const bundle = new URL(`./wake-alarm-card-bundle.js?v=${version}`, import.meta.url);
function loadWhenReady() {
  if (!customElements.get("home-assistant")) {
    setTimeout(loadWhenReady, 50);
    return;
  }
  import(bundle.href).catch((error) => {
    console.error("Wake Alarm card failed to load", error);
    setTimeout(loadWhenReady, 1000);
  });
}
loadWhenReady();
