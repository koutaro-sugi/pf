export type ContactItem = {
  label: string;
  value: string;
  href?: string;
  action?: "copy";
};

export type WorkMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  thumb?: string;
};

export type WorkItem = {
  title: string;
  meta: string;
  image?: string;
  alt?: string;
  gallery?: WorkMedia[];
};

export type VisualItem = {
  placeholder?: string;
  caption: string;
  image?: string;
  alt?: string;
};

export const profile = {
  name: "Koutaro SUGI",
  role: "UAS Operator / Prototype Builder",
  location: "Nakano, Tokyo / Goto, Nagasaki",
  year: "2026",
  contact: [
    { label: "Mail", value: "sugi@5xlabs.jp", action: "copy" },
    { label: "GitHub", value: "github.com/koutaro-sugi", href: "https://github.com/koutaro-sugi" },
    { label: "Base", value: "Nakano, Tokyo / Goto, Nagasaki" },
  ] satisfies ContactItem[],
};

export const intro = {
  certifications: [
    "一等無人航空機操縦士 (マルチローター)",
    "二等無人航空機操縦士 (飛行機)",
  ],
  activities: [
    "フライト業務: 産業機 / 試験機 / GCS / リモートパイロット",
    "個人開発: Webアプリケーション / AWS / IoT / PX4 / ArduPilot / DJI SDK",
  ],
};

export const selectedWorks = [
  {
    title: "RC Mower PoC",
    meta: "2026 · Steel / Aluminum",
    image: "images/plower_top.jpg",
    alt: "RC mower prototype overview",
    gallery: [
      {
        type: "image",
        src: "images/plower_top.jpg",
        alt: "RC mower prototype overview",
      },
      {
        type: "image",
        src: "images/plower_4_on_kei_truck.jpg",
        alt: "RC mower prototype on kei truck",
      },
      {
        type: "image",
        src: "images/plower_1_wheel_assym.jpg",
        alt: "Wheel assembly detail for RC mower prototype",
      },
      {
        type: "video",
        src: "images/plower_2_in-action.mp4",
        alt: "RC mower prototype moving through grass",
        poster: "images/plower_2_in-action.jpg",
      },
      {
        type: "video",
        src: "images/plower_3_taxi.mp4",
        alt: "RC mower prototype driving on road",
        poster: "images/plower_4_on_kei_truck.jpg",
      },
    ],
  },
  {
    title: "Portable Weather Sensor / Web Dashboard",
    meta: "2025 · ABS",
    image: "images/mado_rev2.png",
    alt: "Portable weather sensor enclosure",
    gallery: [
      {
        type: "image",
        src: "images/mado_rev2.png",
        alt: "Portable weather sensor enclosure",
      },
      {
        type: "image",
        src: "images/mado_db.png",
        alt: "Weather sensor dashboard",
      },
    ],
  },
  {
    title: "All-Directional Mobile Platform",
    meta: "2020 · Aluminum",
    image: "images/mech_top.jpg",
    alt: "All-directional mobile platform top view",
    gallery: [
      {
        type: "image",
        src: "images/mech_top.jpg",
        alt: "All-directional mobile platform top view",
      },
      {
        type: "image",
        src: "images/mech_wip-1.jpg",
        alt: "All-directional mobile platform components on workbench",
      },
      {
        type: "image",
        src: "images/mech_wip-2.jpg",
        alt: "All-directional mobile platform prototype on workbench",
      },
      {
        type: "image",
        src: "images/mech_wip-3.jpg",
        alt: "Drive unit detail for all-directional mobile platform",
      },
      {
        type: "video",
        src: "images/mech-4_in-action.mp4",
        alt: "All-directional mobile platform in motion",
        poster: "images/mech_top.jpg",
      },
    ],
  },
  {
    title: "Reactor Inspection Robot",
    meta: "2020 · Aluminum / ABS",
    image: "images/geiger_wip-3.jpg",
    alt: "Detail of reactor inspection robot with red printed parts",
    gallery: [
      {
        type: "image",
        src: "images/geiger_wip-3.jpg",
        alt: "Detail of reactor inspection robot with red printed parts",
      },
      {
        type: "image",
        src: "images/geiger_wip-1.jpg",
        alt: "Reactor inspection robot prototype on workbench",
      },
      {
        type: "image",
        src: "images/geiger_wip-2.jpg",
        alt: "CAD screen for reactor inspection robot",
      },
      {
        type: "video",
        src: "images/geiger_wip-4.mp4",
        alt: "Reactor inspection robot prototype video",
        poster: "images/geiger_wip-4.jpg",
        thumb: "images/geiger_wip-4.jpg",
      },
    ],
  },
] satisfies WorkItem[];

export const independentDevelopment = {
  description: "VTOL、ソフトウェア/ハードウェアの高速プロトタイピング、ラジコン草刈機、DJI SDK",
  heroCaption: "Mower / prototype detail",
  heroImage: "images/plower_1_wheel_assym.jpg",
  heroAlt: "Wheel assembly detail for RC mower prototype",
  sideItems: [
    {
      image: "images/mech_wip-3.jpg",
      alt: "Drive unit detail for all-directional mobile platform",
      caption: "Mechanical / drive detail",
    },
    {
      image: "images/geiger_wip-2.jpg",
      alt: "CAD screen for reactor inspection robot",
      caption: "CAD / design process",
    },
  ] satisfies VisualItem[],
};

export const fragments = {
  description: "制作過程、部材、断片",
  sideItems: [
    {
      image: "images/random/IMG_0417.jpg",
      alt: "Prototype under bench",
      caption: "Prototype / concept development",
    },
    {
      image: "images/random/IMG_1280.jpg",
      alt: "Measurement setup on workbench",
      caption: "Generative Design / testing",
    },
    {
      image: "images/random/IMG_1383.jpg",
      alt: "Air duct component",
      caption: "3D Printing / fabrication",
    },
    {
      image: "images/random/IMG_1784.png",
      alt: "KiCad PCB layout view",
      caption: "Prototype / PCB Concept",
    },
    {
      image: "images/random/IMG_1782.png",
      alt: "Hand-routed PCB on 3D printed substrate",
      caption: "3D Printing / PCB Concept",
    },
    {
      image: "images/random/IMG_1785.png",
      alt: "Drone landing gear CAD with generative struts",
      caption: "Generative Design / Metal 3D Printing Concept",
    },
  ] satisfies VisualItem[],
};
