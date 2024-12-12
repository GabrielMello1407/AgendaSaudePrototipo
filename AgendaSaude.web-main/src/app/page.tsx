import Carrousel from "@/components/Carrousel";

import Section from "@/components/ui/section";

import { Container } from "../components/Container";

import { FaGithub, FaLinkedin } from "react-icons/fa";
export default function Home() {
  return (
    <Container>
      <Carrousel />
      <Section
        imageSrc="/logo_soujunior.png"
        title="Produto sem fins lucrativos"
        description={
          <p>
            Esse MVP de produto digital é fruto de uma iniciativa do SouJunior
            Labs. Maiores informações:
          </p>
        }
        links={[
          {
            label: <FaLinkedin size={40} />,
            href: " https://www.linkedin.com/company/soujunior-labs/"
          },
          {
            label: <FaGithub size={40} />,
            href: "https://github.com/SouJunior-Labs/project-list/wiki"
          }
        ]}
      />
    </Container>
  );
}
