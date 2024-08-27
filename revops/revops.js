async function populateServices() {
  const request = new Request("services.json");

  const response = await fetch(request);
  const services = await response.json();

  const servicesList = document.getElementById("services");
  servicesList.innerHTML = services
    .map(
      (service) => `
        <div class="collection-item w-dyn-item">
          <div class="div-block link-block">
            <img src="${service.Icon}" loading="lazy" alt="" class="image"/>
            <h3 class="post-preview-title">${service.Name}</h3>
            <p class="post-summary">${service["Short description"]}</p>
          </div>
        </div>
      `
    )
    .join("");
}

populateServices();
