import styles from "../css/AboutUs.module.css";
import about from "../assets/products/bundle/bundle_4.jpg";

/**
 * AboutUs component displays information about the company or individual behind the website.
 * @component
 * @returns {JSX.Element} The about us page element.
 */
function AboutUs() {
  return (
    <div className={styles["about-page-container"]}>
      <h3 className={styles["page-title"]}>ABOUT US</h3>
      <div className={styles["about-page"]}>
        <div className={styles.text}>
          <p>
            For six years, I immersed myself in the corporate world. It was a
            path that promised and delivered stability, a competitive income,
            and a clear career trajectory. I learned invaluable lessons about
            structure, discipline, and navigating complex environments. On
            paper, it was the definition of success, and I was grateful for the
            opportunities it provided.
          </p>
          <p>
            Then, an unexpected organizational shift presented me with a
            profound crossroads. It wasn't a crisis, but a moment that
            demanded a decision about my future. The path forward wasn't
            clear; it felt abstract and daunting. How do you make a choice
            that impacts not just your next role, but your long-term
            well-being and sense of purpose? The weight of that uncertainty,
            the challenge of discerning the 'right' direction amidst so many
            unknowns, was immense.
          </p>
          <p>
            In that period of intense reflection, I found myself searching for
            a way to process the noise and gain clarity. I turned to an old
            habit: putting my thoughts onto paper. This wasn't just jotting
            notes; it was a deliberate act of structured self-inquiry, a way
            to untangle the complex web of my emotions and aspirations. It was
            in these quiet moments that clarity began to emerge, revealing a
            powerful tool for navigating uncertainty.
          </p>
          <p>
            Through this consistent practice of intentional reflection, I had a
            profound realization: it's a mechanism for deep self-discovery. It
            helped me uncover my true values, understand my mental state, and
            gain a deeper sense of who I was beyond my job title. I recognized
            that the challenges I faced—the need for clarity, mental
            well-being, and self-understanding— are universal among young
            professionals striving to build meaningful careers and lives. This
            personal journey of discovery ignited a new purpose within me.
          </p>
          <p>
            That's why I founded The Solus. It's born from my own experience
            of navigating uncertainty and finding clarity through intentional
            reflection. My deepest desire is to create value by providing the
            tools and guidance that empower other young professionals to
            embark on their own journeys of self-discovery. The Solus aims to
            provide a supportive space for you to reflect, nurture your mental
            well-being, and gain a deeper understanding of yourselves. By
            cultivating these practices early, you can build the resilience
            needed to navigate life's inevitable complexities with greater
            calm and clarity, empowering you to make grounded decisions and
            build a life that aligns with your deepest aspirations.
          </p>
        </div>
        <div className={styles.content}>
          <img src={about} alt="product"></img>
          <div className={styles["image-overlay"]}></div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
