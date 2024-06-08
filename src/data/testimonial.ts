interface TestimonyType {
  id: number;
  name: string;
  title: string;
  imgSrc: string;
  alt: string;
  testimony: string;
}

const testimonies: TestimonyType[] = [
  {
    id: 1,
    name: "Chinonso Eze",
    title: "Operations Manager, Nigeria",
    imgSrc: "/src/assets/images/profile1.jpg",
    // Photo by Andrew Dick: https://www.pexels.com/photo/photo-of-man-in-white-shirt-with-round-black-analog-watch-697509/
    alt: "picture of Chinonso Eze",
    testimony:
      "At Hermes Logistics, the dynamic pace and challenge of managing operations across Nigeria have honed my problem-solving skills tremendously. Each day brings unique challenges in our bid to streamline supply chains and enhance delivery efficiency. I'm proud to contribute to our mission of redefining logistics with innovative solutions and a relentless focus on customer satisfaction.",
  },
  {
    id: 2,
    name: "Maria Fernández",
    title: "Logistics Coordinator, Spain",
    imgSrc: "/src/assets/images/profile2.jpg",
    // Photo by Liza Summer: https://www.pexels.com/photo/latin-american-female-freelancer-using-laptop-in-home-near-plant-6347900/
    alt: "picture of Maria Fernández",
    testimony:
      "Working with Hermes Logistics has offered me an invaluable perspective on the intricacies of international logistics. Collaborating across teams to ensure smooth transitions from our European hubs to worldwide locations is as challenging as it is rewarding. The support from management and their openness to innovative approaches in logistics make every achievement more impactful.",
  },
  {
    id: 3,
    name: "Samuel Lee",
    title: "Fleet Supervisor, Singapore",
    imgSrc: "/src/assets/images/profile3.jpg",
    // Photo by RDNE Stock project: https://www.pexels.com/photo/a-man-in-black-suit-holding-a-folder-7845101/
    alt: "picture of Samuel Lee",
    testimony:
      "My role as Fleet Supervisor at Hermes Logistics in Singapore allows me to directly impact the efficiency and sustainability of our operations. I oversee a fleet that's progressively embracing green technologies, aligning with our commitment to environmental responsibility. The dedication of our team and the tangible results we see daily make my work here extremely fulfilling.",
  },
];

export { testimonies };
