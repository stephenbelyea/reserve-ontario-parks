(() => {
  const searchForm = document.getElementById("search-parks");
  const searchResults = document.getElementById("search-results");

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

  const onSubmitSearchParks = (event) => {
    event.preventDefault();

    const searchParks = [
      { park: "Pinery", campground: "Riverside Area 1", mapId: "-2147483326" },
    ];
    const searchDates = [
      { startDate: "2024-02-02", endDate: "2024-02-04" },
      { startDate: "2024-02-09", endDate: "2024-02-11" },
      { startDate: "2024-02-16", endDate: "2024-02-18" },
      { startDate: "2024-02-23", endDate: "2024-02-25" },
    ];

    const allParksSearchUrls = getAllParksSearchUrls(searchParks, searchDates);

    for (let p = 0; p < allParksSearchUrls.length; p++) {
      const parkSearch = allParksSearchUrls[p];

      const searchFrame = document.createElement("iframe");
      searchFrame.setAttribute("src", parkSearch.searchUrl);

      const searchHeading = document.createElement("h2");
      searchHeading.textContent = parkSearch.message;

      const searchPanel = document.createElement("article");
      searchPanel.appendChild(searchHeading);
      searchPanel.appendChild(searchFrame);

      searchResults.appendChild(searchPanel);
    }
  };

  searchForm.addEventListener("submit", onSubmitSearchParks);
})();
