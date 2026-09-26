/** A bundle can be requested by both HA frontend and dashboard resources. */
export function customElement(name: string) {
  return <T extends CustomElementConstructor>(constructor: T): T => {
    if (!customElements.get(name)) customElements.define(name, constructor);
    return constructor;
  };
}
