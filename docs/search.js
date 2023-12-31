(() => {
  const searchForm = document.getElementById("search-parks");
  const searchResults = document.getElementById("search-results");
  const submit = document.getElementById("submit");

  const ontarioParksBaseUrl =
    "https://reservations.ontarioparks.com/create-booking/results";

  const defaultSearchParams = [
    "searchTabGroupId=2",
    "bookingCategoryId=2",
    "partySize=4",
  ];

  const buildParksSearchUrl = (mapId, startDate, endDate) => {
    const searchParams = [
      "mapId=" + mapId,
      "startDate=" + startDate,
      "endDate=" + endDate,
      ...defaultSearchParams,
    ];
    return `${ontarioParksBaseUrl}?${searchParams.join("&")}`;
  };

  const getAllParksSearchUrls = (searchParks, searchDates) => {
    const searchUrls = [];
    searchParks.map(({ mapId, park, campground }) => {
      searchDates.map(({ startDate, endDate }) => {
        searchUrls.push({
          message: `${park} - ${campground} from ${startDate} to ${endDate}`,
          searchUrl: buildParksSearchUrl(mapId, startDate, endDate),
        });
      });
    });
    return searchUrls;
  };

  const createFrameNode = ({ searchUrl, message }) => {
    const frame = document.createElement("iframe");
    frame.setAttribute("src", searchUrl);
    frame.setAttribute("title", "Search results for " + message);
    frame.setAttribute("referrerpolicy", "same-origin");
    frame.setAttribute(
      "sandbox",
      [
        "allow-forms",
        "allow-scripts",
        "allow-downloads",
        "allow-same-origin",
        "allow-storage-access-by-user-activation",
      ].join(" ")
    );

    const frameContainer = document.createElement("div");
    frameContainer.setAttribute("class", "frame-container");
    frameContainer.appendChild(frame);

    return frameContainer;
  };

  const createHeadingNode = ({ message, searchUrl }) => {
    const heading = document.createElement("h2");
    heading.textContent = message;

    const link = document.createElement("a");
    link.setAttribute("href", searchUrl);
    link.setAttribute("target", "_blank");
    link.textContent = "Open this page in a new tab";

    const header = document.createElement("header");
    header.appendChild(heading);
    header.appendChild(link);

    return header;
  };

  const createArticleNode = (parkSearch) => {
    const article = document.createElement("article");
    const children = [
      createHeadingNode(parkSearch),
      createFrameNode(parkSearch),
    ];
    for (let c = 0; c < children.length; c++) {
      article.appendChild(children[c]);
    }
    return article;
  };

  const onSubmitSearchParks = async (event) => {
    event.preventDefault();
    submit.setAttribute("disabled", "true");
    submit.textContent = "Loading...";

    const searchParks = [
      { park: "Pinery", campground: "Riverside Area 1", mapId: "-2147483326" },
      {
        park: "MacGregor Point",
        campground: "Algonquin Birch Blvd",
        mapId: "-2147483401",
      },
    ];
    const searchDates = [
      { startDate: "2024-01-26", endDate: "2024-01-28" },
      { startDate: "2024-02-02", endDate: "2024-02-04" },
      { startDate: "2024-02-16", endDate: "2024-02-18" },
      { startDate: "2024-02-23", endDate: "2024-02-25" },
      { startDate: "2024-03-01", endDate: "2024-03-03" },
      { startDate: "2024-03-08", endDate: "2024-03-10" },
    ];

    const allParksSearchUrls = getAllParksSearchUrls(searchParks, searchDates);

    for (let p = 0; p < allParksSearchUrls.length; p++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          searchResults.appendChild(createArticleNode(allParksSearchUrls[p]));
          resolve();
        }, 300);
      });
    }

    submit.removeAttribute("disabled");
    submit.textContent = "Search";

    searchResults.scrollIntoView();
  };

  searchForm.addEventListener("submit", onSubmitSearchParks);
})();
