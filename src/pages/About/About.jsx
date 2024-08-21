import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import SST from "../../assets/images/SST.png";
import RKT2 from "../../assets/images/RKT2.png";
import NEHS from "../../assets/images/NEHS.jfif";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            I'm a passionate programmer, who is always looking for new
            challenges to improve myself, also a team player, who is always
            ready to learn new things and help others.
            <br />I was born and raised in Kalyan, India. I love to sketch
            and in my free time I like to read books, watch movies
            and play video games.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "S.S. Thakurnath college of arts, commerce & science, Ulhasnagar",
                p: "Bachelors of Computer Science (2020-2023)",
                image: SST,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "R.K. Talreja college of Arts, Commerce & Science, Ulhasnagar",
                p: "Junior College (2018-2020)",
                image: RKT2,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "National English High School, Kalyan",
                p: "Secondary Education (2011-2018)",
                image: NEHS,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
