blogPosts = {};

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
              <h3 class="post-preview-title">${post.Name}</h3>
              <p class="post-summary">${post["Post Summary"]} <u>Read&nbsp;more</u></p>
            </div>
          </a>
        </div>
      `
    )
    .join("");
}

getLatestBlogPosts();
