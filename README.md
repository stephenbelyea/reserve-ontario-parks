# Reserve Ontario Parks

A simple tool to help search a variety of dates across one or more parks for roofed accommodations (yurt or cabin).

It works by looping through the specified parks and running a search on each set of dates per campground. All of these are then rendered in separate `iframe` containers. They may be slow to load or get blocked by Parks Ontario at times. If it happens, just refresh and try again.

## Run locally

```bash
npm install && npm start
```

## Deploy

Anytime the `main` branch is updated on the remote, GitHub Pages automatically queues a new deployment.

You can find it live at: [stephenbelyea.github.io/reserve-ontario-parks](https://stephenbelyea.github.io/reserve-ontario-parks/)
