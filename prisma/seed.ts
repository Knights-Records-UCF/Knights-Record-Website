import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    await prisma.announcement.createMany({
        data: [
            {
                title: "Next meeting",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquam nisl, eget aliquam nunc nisl eget nunc.",
                backgroundColor: "#E18181",
            },
            {
                title: "Workshop!!!",
                description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
                backgroundColor: "#17A1FA",
            },
            {
                title: "Super cool social",
                description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
                backgroundColor: "#8AFFC8",
            },
            {
                title: "Helo guys!!!!",
                description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
                backgroundColor: "#1C7049",
            },
            {
                title: "Helo guys!!!!",
                description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
                backgroundColor: "#1C7049",
            },
            {
                title: "Helo guys!!!!",
                description: "hello oijdoifjaoidsjfo jasdof fdosfj osdjfosd",
                backgroundColor: "#1C7049",
            },
        ]
    })

    await prisma.artist.createMany({
        data: [
            {
                name: "Ant Moreiro",
                img: "/images/antmoreiro.jpg",
                genres: ["Indie", "Pop"],
                description:`📍Orlando, Florida || 19 🇨🇺
                            Vocalist, Producer, Artist 🎶
                            Never let another pilot fly in your plane 🌹`,
                socialLinks: [
                    "https://www.instagram.com/antmoreiro/",
                    "https://www.youtube.com/@antmoreiro",
                ],
            }
        ]
    })

    await prisma.board.createMany({
        data: [
            {
                name: "Dany",
                role: "President",
                team: "Executive",
                image: "/images/1.jpg",
            }
        ]
    })

}

main();