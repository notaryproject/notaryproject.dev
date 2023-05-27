const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  const descriptionContainer = accordionItemHeader.querySelector(
    ".description-container1"
  );
  const originalContent = descriptionContainer.innerHTML.trim();

  accordionItemHeader.addEventListener("click", () => {
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;

    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
      const watchButton = descriptionContainer.querySelector(".watch-button");

      const videoInfoHTML = `
                    <div class="content">
                      <p class="video-info" 
                      style="font-style: normal;
                      font-weight: 500;
                      font-size: 17.0449px;
                      color: #838383;"
                      >31min • 234 views • 12th Dec, 2023</p>
                      <button class="watch-button">Watch now<span>&#10230;</span></button>
                    </div>
                  `;

      descriptionContainer.innerHTML = videoInfoHTML;

      const updatedWatchButton =
        descriptionContainer.querySelector(".watch-button");
      updatedWatchButton.addEventListener("click", () => {
        window.open("https://www.youtube.com/watch?v=LKpFynI0S_w", "_blank");
      });
    } else {
      accordionItemBody.style.maxHeight = 0;
      descriptionContainer.innerHTML = originalContent;
    }
  });
});
