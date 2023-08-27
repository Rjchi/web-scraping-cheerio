const { load } = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();

const baseUrl = "https://gogoanimehd.io/";

app.use(express.json());

app.get("/api/animes", async (req, res) => {
  try {
    const { data } = await axios.get(`${baseUrl}`);
    const $ = load(data);

    let animes = [];
    $("ul.items li").each((i, el) => {
      animes.push({
        // name: $(el).find('p.name a').text().replace(/Episode.*$/gm, '').trim(),
        name: $(el).find("p.name a").text().trim(),
        img: $(el).find("li > div.img > a > img").attr("src"),
        episode: $(el).find("p.episode").text(),
      });
    });

    res.json(animes);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/api/watching/:name/:episode", async (req, res) => {
  let totalepisode = [];
  const name = req.params.name;
  const episode = req.params.episode;
  const url = `${baseUrl}${name}-episode-${episode}`;

  try {
    const { data } = await axios.get(url);
    const $ = load(data);

    if ($(".entry-title").text() === "404") {
      return res
        .status(404)
        .json({ alter_links: [], link, totalepisode: totalepisode });
    }

    totalepisode = $("#episode_page li > a ").text().split("-");

    totalepisode = totalepisode[totalepisode.length - 1];

    const link = $("li.anime > a").attr("data-video");
    const link2 = $("li.vidcdn > a").attr("data-video");
    const link3 = $("li.streamwish > a").attr("data-video");
    // console.log({
    //   link,
    //   link2,
    //   link3,
    // });
    const nl = [link, link2, link3];

    return res
      .status(200)
      .json({ alter_links: nl, link, totalepisode: totalepisode });
  } catch (error) {
    return res
      .status(404)
      .json({ alter_links: [], link: "", totalepisode: totalepisode });
  }
});

app.listen(5000);
console.log("Server 5000");
