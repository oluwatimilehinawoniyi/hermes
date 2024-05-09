import shipmentVideo from "@assets/images/shipment.mp4";
import Section from "@components/UI/Section/Section";

export default function WhatWeDo() {
  return (
    <Section>
      <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem repudiandae doloremque aliquam, obcaecati
            necessitatibus perferendis.
          </p>
          <div>
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>
                <h1>20k</h1>
                <p>Lorem, ipsum.</p>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <video width="750" autoPlay loop muted>
          <source src={shipmentVideo} type="video/mp4" />
          Your browser does not support the video tag.
          {/* // video credit: Video by Jay S: https://www.pexels.com/video/a-railway-crossing-4021642/ */}
        </video>
      </div>
    </Section>
  );
}
