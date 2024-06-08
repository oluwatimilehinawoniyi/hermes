import {
  Associates,
  CallToAction,
  Features,
  Footer,
  Hero,
  Testimonials,
  WhatWeDo,
} from "@components/layouts";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Features />
      <WhatWeDo />
      <Associates />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
};
