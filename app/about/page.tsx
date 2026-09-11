import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiDiscord, SiLinkedin, SiLinktree } from "react-icons/si";

const JOIN_NOW_URL = "https://linktr.ee/KnightsRecordsUCF";

// Swap this to change the artwork featured inside the CD case without touching the layout below.
const cdImage = "/team-image.jpg";
const cdCaseFrame = "/dvd-case.png";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/knightsrecordsucf",
    icon: SiInstagram,
    color: "text-[#E1306C]",
  },
  {
    name: "Discord",
    href: "https://discord.com/invite/h8BaaVQhBG",
    icon: SiDiscord,
    color: "text-[#5865F2]",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/knights-records",
    icon: SiLinkedin,
    color: "text-[#0A66C2]",
  },
  {
    name: "Linktree",
    href: "https://linktr.ee/KnightsRecordsUCF",
    icon: SiLinktree,
    color: "text-[#43E660]",
  },
];

function CdCase({ image = cdImage }: { image?: string }) {
  return (
    <div className="ml-5 relative w-full max-w-55 sm:max-w[260px] md:max-w-75 mb-6 drop-shadow-black hover:scale-105 transition-all ease-in-out duration-300">
      {" "}
      <Image
        src={cdCaseFrame}
        alt="CD Case"
        title="CD Case"
        width={940}
        height={823}
        className="relative h-auto w-full"
      />
      <div className="absolute left-[10%] right-[12%] top-[1%] bottom-[11%] overflow-hidden">
        <Image
          src={image}
          alt="Featured artwork"
          title="People"
          fill
          sizes="300px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="flex flex-col items-center px-4 py-8 md:px-8 md:py-12">
      <CdCase />
      <p className="mt-6 w-full max-w-2xl text-center text-sm sm:text-base md:text-lg text-[#656565] dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
        Knights Records aims to foster the growth of emerging artists and
        industry professionals within the UCF and Orlando communities by
        operating as a mock music label. Through hands-on management, marketing,
        and event coordination, we provide students and local talent with the
        tools, resources, and experience needed to succeed in the music
        industry.
      </p>
      <Link
        href={JOIN_NOW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 rounded-md bg-[#656565] px-4 py-1 text-sm sm:text-base font-semibold text-white"
      >
        Join Now
      </Link>
      <div>
        <h1 className="mt-12 mb-2 text-xl sm:text-2xl font-[525] text-[#656565] dark:text-[#fbfbfb] transition-all duration-300 ease-in-out">
          Connect with Us
        </h1>
      </div>
      <div className="w-full max-w-5xl border-t-[1.5px] border-[#D9D9D9] dark:border-[#323236] transition-all duration-300 ease-in-out" />{" "}
      {/* modify layout.tsx at some point so each page has a footer/space at bottom */}
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 place-items-center">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#f0f0f0] dark:bg-[#232323] hover:bg-[#e5e5e5] dark:hover:bg-[#2d2d2d] transition-all ease-in-out duration-300"
          >
            <social.icon
              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${social.color}`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
