import client from "./graph/getClient";
import { getProduct } from "./graph/queries";

import { createBrowserHistory } from "history";
import { AttributeSet, CartAttr } from "./interfaces";

export function stripScripts(html: string): string {
  return html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

export function extractDefaultAttrs(attrs: AttributeSet[]) {
  return attrs.map((attr) => {
    return {
      attr_id: attr.id,
      item_id: attr.items[0].id,
    } as CartAttr;
  });
}

export function getItemIdfromUrl() {
  const location = createBrowserHistory().location;
  const id = location.pathname.split("/")[2];
  return id;
}

export function fetchProduct(pid: string) {
  return client.query({
    query: getProduct(pid),
  });
}
