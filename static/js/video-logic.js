document.addEventListener("DOMContentLoaded", () => {
  const accordionItemHeaders = document.querySelectorAll(
    ".accordion-item-header"
  );

  accordionItemHeaders.forEach((accordionItemHeader) => {
    const descriptionContainer = accordionItemHeader.querySelector(
      ".description-container1"
    );
    const details = accordionItemHeader.querySelector(".content-1");
    const videoInfoHTML = details.innerHTML.trim();
    const originalContent = descriptionContainer.innerHTML.trim();

    accordionItemHeader.addEventListener("click", () => {
      accordionItemHeader.classList.toggle("active");
      const accordionItemBody = accordionItemHeader.nextElementSibling;

      if (accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight =
          accordionItemBody.scrollHeight + "px";
        descriptionContainer.innerHTML = videoInfoHTML;
      } else {
        accordionItemBody.style.maxHeight = 0;
        descriptionContainer.innerHTML = originalContent;
      }
    });
  });

  accordionItemHeaders.forEach((header) => {
    const blockDiv = header.closest(".block");

    header.addEventListener("click", () => {
      blockDiv.classList.toggle("active");
    });
  });
});

function performSearch() {
  var searchInput = document.getElementById("search-input");
  var query = searchInput.value.toLowerCase();

  var videoPages = document.getElementsByClassName("video-page");
  for (var i = 0; i < videoPages.length; i++) {
    var videoPage = videoPages[i];
    var videoTitle = videoPage
      .querySelector(".main-title")
      .textContent.toLowerCase();
    var videoDescription = videoPage
      .querySelector(".original-content")
      .textContent.toLowerCase();

    if (videoTitle.includes(query) || videoDescription.includes(query)) {
      videoPage.style.display = "block";
    } else {
      videoPage.style.display = "none";
    }
  }
}

document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
