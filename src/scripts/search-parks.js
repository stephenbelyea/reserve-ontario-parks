import puppeteer from "puppeteer";

const viewport = {
  width: 1280,
  height: 1800,
};

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
        park,
        campground,
        dates: `${startDate} to ${endDate}`,
        searchUrl: buildParksSearchUrl(mapId, startDate, endDate),
      });
    });
  });
  return searchUrls;
};

(async () => {
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
  const browser = await puppeteer.launch({ headless: false, slowMo: 25 });

  for (let i = 0; i < allParksSearchUrls.length; i++) {
    const { park, campground, dates, searchUrl } = allParksSearchUrls[i];
    console.log(`Searching: ${park} - ${campground} for ${dates}...`);

    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(searchUrl, {
      waitUntil: "load",
    });
  }
})();
