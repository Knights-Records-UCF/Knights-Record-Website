"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Vinyl from "../components/Vinyl";

interface Artist {
  name: string;
  img: string;
  genres: string[];
  description: string;
  socialLinks: string[];
}

const ARTISTS: Artist[] = [
  {
    name: "Ant Moreiro",
    img: "/images/antmoreiro.jpg",
    genres: ["Indie", "Pop"],
    description: `📍Orlando, Florida || 19 🇨🇺
Vocalist, Producer, Artist 🎶
Never let another pilot fly in your plane 🌹`,
    socialLinks: [
      "https://www.instagram.com/antmoreiro/",
      "https://www.youtube.com/@antmoreiro",
    ],
  },

  {
    name: "Drocas",
    img: "/images/drocas.jpg",
    genres: ["Electronic", "Alternative"],
    description: "STREAM FLOOD 🌊",
    socialLinks: [
      "https://www.instagram.com/damndrocas/",
      "https://music.apple.com/us/artist/drocas/1672769513",
      "https://www.youtube.com/@damndrocas",
      "https://open.spotify.com/artist/6Ut6KyIktTCd9DUbVHrIX9",
      "https://soundcloud.com/user-648836013",
    ],
  },
  {
    name: "Dylanthisevening",
    img: "/images/dylanthisevening.jpg",
    genres: ["Indie", "Pop"],
    description: "good evening",
    socialLinks: ["https://www.instagram.com/dylanthisevening/"],
  },

  {
    name: "John Ruiz",
    img: "/images/johnruiz.jpg",
    genres: ["R&B", "Pop"],
    description: "Music + Food Lover ✨❤️",
    socialLinks: [
      "https://www.instagram.com/jaetr25/",
      "https://www.youtube.com/@jaetr25",
    ],
  },
  {
    name: "Daniel Vu",
    img: "/images/danielvu.jpg",
    genres: ["Jazz", "Classical"],
    description: `songs and sometimes pictures
..
dont think theres a tangerine here, just forget that there isnt one`,
    socialLinks: [
      "https://www.instagram.com/daniel.vu.music",
      "https://open.spotify.com/artist/1",
    ],
  },
  {
    name: "ten7teen",
    img: "/images/ten7teen.jpg",
    genres: ["Hip-Hop", "Rap"],
    description: "orl",
    socialLinks: [
      "https://www.instagram.com/ten7teeen/",
      "https://on.soundcloud.com/5OgMvyzpxi4NWVf1mA",
    ],
  },
];

export default function Artists() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const artist = ARTISTS[currentIndex];

  const getSocialDetails = (url: string) => {
    // stylings for the social icons
    const iconStyles = { className: "w-6 h-6", fill: "currentColor" };

    // luicide doesnt have copyrighted icons so svgs from simpleicons are used instead
    if (url.includes("instagram"))
      return {
        icon: (
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...iconStyles}
          >
            <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
          </svg>
        ),
        color: "hover:bg-[#E1306C] hover:text-white",
      };
    if (url.includes("soundcloud"))
      return {
        icon: (
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...iconStyles}
          >
            <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z" />
          </svg>
        ),
        color: "hover:bg-[#FF3300] hover:text-white",
      };
    if (url.includes("spotify"))
      return {
        icon: (
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...iconStyles}
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        ),
        color: "hover:bg-[#1DB954] hover:text-white",
      };
    if (url.includes("youtube"))
      return {
        icon: (
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...iconStyles}
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
        color: "hover:bg-[#FF0000] hover:text-white",
      };
    if (url.includes("apple"))
      return {
        icon: (
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...iconStyles}
          >
            <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z" />
          </svg>
        ),
        color: "hover:bg-[#FC3C44] hover:text-white",
      };
    return {
      // if they have links like linktree
      icon: <ExternalLink size={20} />,
      color: "hover:bg-gray-600 hover:text-white",
    };
  };

  return (
    <div className="h-full grid grid-cols-[1fr_2fr]">
      {/* vinyl scroll! */}
      <div className="flex flex-col items-center overflow-y-auto no-scrollbar py-10">
        <Vinyl onSelectArtist={(index) => setCurrentIndex(index)} />
      </div>

      {/* displays the artist here!*/}
      <div className="flex h-full w-full flex-col justify-center items-center [&_h2]:text-[#656565] dark:[&_h2]:text-[#fbfbfb] [&_h1]:text-[#656565] dark:[&_h1]:text-[#fbfbfb] [&_p]:text-[#656565] dark:[&_p]:text-[#D9D9D9] [&_p]:text-sm">
        <div
          className="h-64 w-64 bg-[#D9D9D9] rounded-full shadow-md overflow-hidden bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${artist.img})` }}
        ></div>

        <h1 className="font-bold text-3xl mt-8 mb-2 ">{artist.name}</h1>

        <div className="h-px w-[80%] bg-[#D9D9D9] mb-5"></div>

        <div className="px-10 max-w-lg">
          <div className="self-start my-2">
            <p className="text-center font-semibold ">Genres</p>
            <p className="text-center italic">{artist.genres.join(", ")}</p>
          </div>

          <p className="text-center mt-4 leading-relaxed whitespace-pre-line">
            {artist.description}
          </p>
        </div>

        <h2 className="text-xl mt-10 font-semibold text-center">
          Follow {artist.name}
        </h2>
        <div className="h-px w-[80%] bg-gray-300 mt-2"></div>

        {/* loops thru socials here*/}
        <div className="flex gap-4 mt-6">
          {artist.socialLinks.map((link, i) => {
            const { icon, color } = getSocialDetails(link);
            return (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-14 w-14 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${color}`}
                title={link}
              >
                {icon}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
