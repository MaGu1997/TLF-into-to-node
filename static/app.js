"use strict";

// API URL
const API = "http://localhost:3000";

// Populate products from API method
const populateProducts = async (category, method = "GET", payload) => {
  const products = document.querySelector("#products");
  products.innerHTML = "";
  const send =
    method === "GET"
      ? {}
      : {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
  const res = await fetch(`${API}/${category}`, { method, ...send });
  const data = await res.json();
  for (const product of data) {
    const item = document.createElement("product-item");
    for (const key of ["name", "rrp", "info"]) {
      const span = document.createElement("span");
      span.slot = key;
      span.textContent = product[key];
      item.appendChild(span);
    }
    products.appendChild(item);
  }
};

// Get elements from DOM
const category = document.querySelector("#category");
const add = document.querySelector("#add");

// Populate products
category.addEventListener("input", async ({ target }) => {
  add.style.display = "block";
  await populateProducts(target.value);
});

// Add product
add.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { target } = e;
  const payload = {
    name: target.name.value,
    rrp: target.rrp.value,
    info: target.info.value,
  };
  await populateProducts(category.value, "POST", payload);
  target.reset();
});

// Custom element
customElements.define(
  "product-item",
  class Item extends HTMLElement {
    constructor() {
      super();
      const itemTmpl = document.querySelector("#item").content;
      this.attachShadow({ mode: "open" }).appendChild(itemTmpl.cloneNode(true));
    }
  }
);
