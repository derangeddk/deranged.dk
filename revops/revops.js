blogPosts = {};

async function populateServices() {
  const request = new Request("services.json");

  const response = await fetch(request);
  const services = await response.json();

  const servicesList = document.getElementById("services");
  servicesList.innerHTML = services
    .map(
      (service) => `
        <div class="collection-item w-dyn-item">
          <a href="${service.Slug}" class="link-block w-inline-block">
            <div class="div-block">
              <img src="${service.Icon}" loading="lazy" alt="" class="image"/>
              <h3 class="post-preview-title">${service.Name}</h3>
              <p class="post-summary">${service["Short description"]}</p>
            </div>
          </a>
        </div>
      `
    )
    .join("");
}

async function populateBlogPosts() {
  const request = new Request("blog-posts.json");

  const response = await fetch(request);
  var unorderedBlogPosts = await response.json();

  blogPosts = unorderedBlogPosts.sort(function (a, b) {
    const aDate = new Date(a.Date);
    const bDate = new Date(b.Date);
    if (aDate == bDate) {
      return 0;
    }
    if (aDate < bDate) {
      return -1;
    }
    if (aDate > bDate) {
      return 1;
    }
  });

  return blogPosts;
}

async function getLatestBlogPosts() {
  var latestBlogPosts = await populateBlogPosts();

  latestBlogPosts = latestBlogPosts.slice(0, 3);

  const blogPostsList = document.getElementById("recent-blog-posts");

  blogPostsList.innerHTML = latestBlogPosts
    .map(
      (post) => `
        <div class="post-preview w-dyn-item">
          <a href="${post.Slug}" class="post-link-block w-inline-block">
            <div class="div-block-2">
              <img
                src="${post["Thumbnail image"]}"
                loading="lazy"
                alt=""
                class="post-thumbnail"
              />
              <h6 class="post-preview-title">${post.Name}</h6>
              <p class="post-summary">${post["Post Summary"]}</p>
            </div>
          </a>
        </div>
      `
    )
    .join("");
}

populateServices();

getLatestBlogPosts();
