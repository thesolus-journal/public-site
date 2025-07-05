import "../css/AboutUs.css";

/**
 * AboutUs component displays information about the company or individual behind the website.
 * @component
 * @returns {JSX.Element} The about us page element.
 */
function AboutUs() {
  return (
    <div className="about-page">
      <div className="text">
        <h3>ABOUT US</h3>
        <p>
          For six years, I immersed myself in the corporate world. It was a path
          that promised and delivered stability, a competitive income, and a
          clear career trajectory. I learned invaluable lessons about structure,
          discipline, and navigating complex environments. On paper, it was the
          definition of success, and I was grateful for the opportunities it
          provided.
        </p>
        <p>
          Then, an unexpected organizational shift presented me with a profound
          crossroads. It wasn't a crisis, but a moment that demanded a decision
          about my future. The path forward wasn't clear; it felt abstract and
          daunting. How do you make a choice that impacts not just your next
          role, but your long-term well-being and sense of purpose? The weight
          of that uncertainty, the challenge of discerning the 'right' direction
          amidst so many unknowns, was immense. It was a struggle I believe many
          young professionals face when confronted with pivotal life or career
          decisions.
        </p>
        <p>
          In that period of intense reflection, I found myself turning to an old
          habit: writing. Not just jotting down notes, but truly journaling—a
          deliberate act of putting thoughts, fears, and aspirations onto paper.
          It was in these quiet moments, with pen in hand, that clarity began to
          emerge. The act of writing became a powerful tool for processing the
          noise, understanding my own emotions, and untangling the complex web of
          my thoughts.
        </p>
        <p>
          Through this consistent practice, I had a profound realization: writing
          isn't just about recording events; it's a profound mechanism for
          self-reflection and discovery. It helped me uncover my true values,
          understand my mental state, and gain a deeper sense of who I was beyond
          my job title. I recognized that the challenges I faced—the need for
          clarity, mental well-being, and self-understanding—are universal among
          young professionals striving to build meaningful careers and lives.
          This personal journey of discovery ignited a new purpose within me.
        </p>
        <p>
          That's why I founded The Solus. It's born from my own experience of
          navigating uncertainty and finding clarity through intentional
          reflection. My deepest desire is to create value by providing the tools
          and guidance that empower other young professionals to embark on their
          own journeys of self-discovery. The Solus is here to help you reflect,
          nurture your mental well-being, and gain a deeper understanding of yourselves,
          empowering you to make grounded decisions and build a life that aligns with your deepest
          aspirations.
        </p>
      </div>
      <div className="content">
        <img src="chapter_01.jpeg" alt="product"></img>
      </div>
    </div>
  );
}

export default AboutUs;
