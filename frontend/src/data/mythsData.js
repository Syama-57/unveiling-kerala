import mannarasala from "../assets/myth/mannarasala.jpg";
import janardhana from "../assets/myth/janardhana.jpg";
import chottanikkara from "../assets/myth/chottanikkara.jpg";
import lokanarkavu from "../assets/myth/lokanarkavu.jpg";
import pambummekkattu from "../assets/myth/pambummekkattu.jpg";
import agasthyakoodam from "../assets/myth/agasthyakoodam.jpg";
import banasura from "../assets/myth/banasura.jpg";
import seetharkundu from "../assets/myth/seetharkundu.jpg";
import perunthenaruvi from "../assets/myth/perunthenaruvi.jpg";
import kollamghost from "../assets/myth/kollam-ghost.jpg";
import hymavathi from "../assets/myth/hymavathi.jpg";
import adiyan from "../assets/myth/adiyan.jpg";
import muthuvan from "../assets/myth/muthuvan.jpg";
import paniya from "../assets/myth/paniya.jpg";
import karinthandan from "../assets/myth/karinthandan.jpg";
import irumbanam from "../assets/myth/irumbanam.jpg";
import muthikulam from "../assets/myth/muthikulam.jpg";

const mythsData = [
  {
    key: "temple",
    title: "Temple Legends",
    items: [
      {
        slug: "mannarasala-temple",
        title: "Mannarasala Temple",
        category: "temple",
        district: "alappuzha",
        img: mannarasala,
        short: "Ancient serpent grove where devotees seek blessings.",
      },
      {
        slug: "janardhana-swamy-temple",
        title: "Janardhana Swamy Temple",
        category: "temple",
        district: "kollam",
        img: janardhana,
        short: "Temple with stories of miracles and devotion.",
      },
      {
        slug: "chottanikkara-temple",
        title: "Chottanikkara Temple",
        category: "temple",
        district: "ernakulam",
        img: chottanikkara,
        short: "Renowned for rituals believed to cure possession.",
      },
      {
        slug: "lokanarkavu-temple",
        title: "Lokanarkavu Temple",
        category: "temple",
        district: "malappuram",
        img: lokanarkavu,
        short: "Linked to North Malabar ballads and warriors of legend.",
      },
      {
        slug: "pambummekkattu-mana",
        title: "Pambummekkattu Mana",
        category: "temple",
        district: "thrissur",
        img: pambummekkattu,
        short: "Traditional manor tied to serpent-worship.",
      },
    ],
  },

  {
    key: "nature",
    title: "Nature & Mountain Legends",
    items: [
      {
        slug: "agasthyakoodam",
        title: "Agasthyakoodam",
        category: "nature",
        district: "thiruvananthapuram",
        img: agasthyakoodam,
        short: "Sacred peak linked with sage Agasthya.",
      },
      {
        slug: "banasura-hill",
        title: "Banasura Hill",
        category: "nature",
        district: "wayanad",
        img: banasura,
        short: "A mountain spoken of in Asura legends.",
      },
      {
        slug: "seetharkundu",
        title: "Seetharkundu",
        category: "nature",
        district: "palakkad",
        img: seetharkundu,
        short: "Water pools tied to Ramayana traces.",
      },
      {
        slug: "perunthenaruvi",
        title: "Perunthenaruvi",
        category: "nature",
        district: "pathanamthitta",
        img: perunthenaruvi,
        short: "Roaring waterfall with river spirits.",
      },
    ],
  },

  {
    key: "ghost",
    title: "Ghosts & Supernatural Myths",
    items: [
      {
        slug: "weeping-ghost-of-kollam",
        title: "The Weeping Ghost of Kollam",
        category: "ghost",
        district: "kollam",
        img: kollamghost,
        short: "A lamenting spirit near an abandoned pond.",
      },
      {
        slug: "hymavathi-pond",
        title: "Hymavathi's Pond",
        category: "ghost",
        district: "kollam",
        img: hymavathi,
        short: "A moonlit pond tied to tragic love.",
      },
    ],
  },

  {
    key: "tribe",
    title: "Tribal Folklore and Legends",
    items: [
      {
        slug: "adiyan-tribe",
        title: "Adiyan Tribe",
        category: "tribe",
        district: "wayanad",
        img: adiyan,
        short: "Oral songs and marshland rites.",
      },
      {
        slug: "muthuvan-tribe",
        title: "Muthuvan Tribe",
        category: "tribe",
        district: "idukki",
        img: muthuvan,
        short: "High-range guardians with honey-rituals.",
      },
      {
        slug: "paniya-tribe",
        title: "Paniya Tribe",
        category: "tribe",
        district: "kasaragod",
        img: paniya,
        short: "Communal drum rituals and ancestral legends.",
      },
      {
        slug: "karinthandan-legend",
        title: "Legend of Karinthandan",
        category: "tribe",
        district: "wayanad",
        img: karinthandan,
        short: "A forest guardian whose story warns of greed.",
      },
    ],
  },

  {
    key: "folklore",
    title: "Local Folklore",
    items: [
      {
        slug: "irumbanam-village",
        title: "Irumbanam Village",
        category: "folklore",
        district: "ernakulam",
        img: irumbanam,
        short: "Small-village tales of guardian spirits.",
      },
      {
        slug: "muthikulam-village",
        title: "Muthikulam Village",
        category: "folklore",
        district: "kottayam",
        img: muthikulam,
        short: "Stories of wells, offerings, and rescue heroes.",
      },
    ],
  },
];

export default mythsData;
