blogPosts = {};

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

async function populateBlogPosts() {
  const request = new Request("blog-posts.json");

  const response = await fetch(request);
  blogPosts = await response.json();
}

async function getLatestBlogPosts() {
  await populateBlogPosts();

  const blogPostsList = document.getElementById("recent-blog-posts");
  const latestBlogPost = document.getElementById("post-preview");

  blogPosts.forEach((post) => {
    const clone = latestBlogPost.content.cloneNode(true);

    const blogPostLink = clone.getElementById("post-preview-link");
    blogPostLink.href = post.Slug;

    const blogPostThumbnail = clone.getElementById("post-preview-thumbnail");
    blogPostThumbnail.src = post["Thumbnail image"];

    const blogPostTitle = clone.getElementById("post-preview-title");
    blogPostTitle.innerHTML = post.Name;

    const blogPostSummary = clone.getElementById("post-preview-summary");
    blogPostSummary.innerHTML = post["Post Summary"];

    blogPostsList.appendChild(clone);
  });
}

populateServices();

getLatestBlogPosts();
