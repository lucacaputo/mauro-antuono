import { Scale, Project } from "../pages/progetti";

const scales: { [k: string]: Scale } = {
    UNIFAMILIARE: 1,
    STABILE_RESIDENZIALE: 2,
    COMPLESSO_RESIDENZIALE: 3,
    MASTERPLAN: 4,
}

export const projects: Project[] = [
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.UNIFAMILIARE,
        data: new Date(),
        year: "2019",
        _id: "1"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.MASTERPLAN,
        data: new Date(),
        year: "2019",
        _id: "2"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.COMPLESSO_RESIDENZIALE,
        data: new Date(),
        year: "2019",
        _id: "3"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.UNIFAMILIARE,
        data: new Date(),
        year: "2020",
        _id: "4"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.UNIFAMILIARE,
        data: new Date(),
        year: "2020",
        _id: "5"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.COMPLESSO_RESIDENZIALE,
        data: new Date(),
        year: "2020",
        _id: "6"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.MASTERPLAN,
        data: new Date(),
        year: "2020",
        _id: "7"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.STABILE_RESIDENZIALE,
        data: new Date(),
        year: "2020",
        _id: "8"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.UNIFAMILIARE,
        data: new Date(),
        year: "2020",
        _id: "9"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.STABILE_RESIDENZIALE,
        data: new Date(),
        year: "2021",
        _id: "10"
    },
    {
        image: "/images/dummy_project.png",
        title: "first project",
        pdfLink: "https://www.google.com",
        luogo: "como",
        scala: scales.COMPLESSO_RESIDENZIALE,
        data: new Date(),
        year: "2021",
        _id: "11"
    },
]