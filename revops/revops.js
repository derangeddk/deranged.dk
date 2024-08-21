async function populateServices() {
  const request = new Request("services.json");

  const response = await fetch(request);
  const services = await response.json();

  const servicesList = document.createElement("div");
  servicesList.classList.add("collection-list", "w-dyn-items");

  services.forEach((service) => {
    const serviceItem = document.createElement("div");
    serviceItem.classList.add("collection-item", "w-dyn-item");

    const serviceItemLink = document.createElement("a");
    serviceItemLink.href = service.Slug;
    serviceItemLink.classList.add("link-block", "w-inline-block");

    const serviceItemContainer = document.createElement("div");
    serviceItemContainer.classList.add("div-block");

    const serviceItemIcon = document.createElement("img");
    serviceItemIcon.src = service.Icon;
    serviceItemIcon.classList.add("image");

    const serviceItemTitle = document.createElement("h3");
    serviceItemTitle.innerHTML = service.Name;
    serviceItemTitle.classList.add("post-preview-title");

    const serviceItemSummary = document.createElement("p");
    serviceItemSummary.innerHTML = service["Short description"];
    serviceItemSummary.classList.add("post-summary");

    serviceItemContainer.append(
      ...[serviceItemIcon, serviceItemTitle, serviceItemSummary]
    );

    serviceItemLink.appendChild(serviceItemContainer);

    serviceItem.appendChild(serviceItemLink);

    servicesList.appendChild(serviceItem);
  });

  const container = document.getElementById("services-list");
  container.appendChild(servicesList);
}

populateServices();
