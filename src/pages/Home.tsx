import {
  Associates,
  CallToAction,
  Features,
  Footer,
  Hero,
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
}

import profile from "@assets/images/profile.jpg";
import Section from "@components/UI/Section/Section";

function Testimonials() {
  return (
    <Section>
      <h1>your fellow associates said:</h1>
      <div>
        <div className="">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi odit
            numquam unde, accusantium eum id omnis incidunt facilis deleniti
            alias! Consectetur commodi saepe repudiandae itaque aliquam
            deserunt, earum eos. Laboriosam esse, amet quo earum dicta quas
            excepturi. Praesentium eius beatae, sit odio, nihil dignissimos
            ipsum nesciunt consequatur voluptatibus error nemo?
          </p>
          <div>
            <div>
              <span>
                <img src={profile} alt="profile picture" />
              </span>
              <span>
                <h2>john doe</h2>
                <p>head of sales, alaska</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
