import { Link } from 'react-router-dom';
import { Users, Target, Award, Heart } from 'lucide-react';
import martinImg from '../assets/Perfiles/Martin.jfif';
import joaquinImg from '../assets/Perfiles/Joaquin.webp';
import jesusImg from '../assets/Perfiles/Jesús.jfif';

const teamMembers = [
  {
    name: "Lucio Martin Linares",
    role: "Develooper",
    description: "Programador FullStack, con experiencia en desarrollo web y móvil.",
    image: martinImg
  },
  {
    name: "Joaquin Juarez",
    role: "Develooper",
    description: "Programador FullStack, con experiencia en desarrollo web y móvil.",
    image: joaquinImg
  },
  {
    name: "Jesús Sir",
    role: "Develooper",
    description: "Programador FullStack, con experiencia en desarrollo web y móvil.",
    image: jesusImg
  }
];

const values = [
  {
    icon: <Target size={32} />,
    title: "Misión",
    description: "Brindar la mejor tecnología al mejor precio, con un servicio al cliente excepcional."
  },
  {
    icon: <Award size={32} />,
    title: "Visión",
    description: "Ser la plataforma de comercio electrónico líder en tecnología en Latinoamérica."
  },
  {
    icon: <Heart size={32} />,
    title: "Valores",
    description: "Calidad, innovación, transparencia y compromiso con nuestros clientes."
  }
];

export const AboutPage = () => {
  return (
    <div className="page">
      <div className="page-header">
        <span className="page-header-badge">Sobre nosotros</span>
        <h1 className="page-title">Conocé Pro Technology</h1>
        <p className="page-subtitle">Tu tienda de tecnología de confianza</p>
      </div>

      {/* About Section */}
      <section className="about-intro">
        <div className="about-intro-content">
          <h2>Quiénes somos</h2>
          <p>
            Somos una empresa dedicada a ofrecer los mejores productos tecnológicos del mercado.
            Desde 2020, conectamos a los usuarios con la tecnología que necesitan, brindando
            asesoramiento personalizado y las mejores condiciones de compra.
          </p>
          <p>
            Nuestro equipo de expertos selecciona cuidadosamente cada producto para garantizar
            la máxima calidad y satisfacción a nuestros clientes.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2 className="about-section-title">Nuestros pilares</h2>
        <div className="about-values-grid">
          {values.map((value, index) => (
            <div key={index} className="about-value-card">
              <div className="about-value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2 className="about-section-title">
          <Users size={24} /> Nuestro equipo
        </h2>
        <div className="about-team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="about-team-card">
              <div className="about-team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <span className="about-team-role">{member.role}</span>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>¿Listo para explorar?</h2>
        <p>Descubrí todos nuestros productos en el catálogo.</p>
        <Link to="/" className="btn btn-primary">Ver catálogo</Link>
      </section>
    </div>
  );
};
