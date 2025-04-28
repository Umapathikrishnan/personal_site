'use client';
import React, { useEffect } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import styles from './ProjectSlider.module.css';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/projects/ecommerce.jpg'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Modern portfolio built with Next.js and Tailwind CSS',
    tags: ['Next.js', 'Tailwind CSS'],
    image: '/projects/portfolio.jpg'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Productivity application with real-time updates',
    tags: ['React', 'Firebase'],
    image: '/projects/taskapp.jpg'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Weather forecasting application with API integration',
    tags: ['JavaScript', 'API'],
    image: '/projects/weather.jpg'
  },
  {
    id: 5,
    title: 'Social Media Analytics',
    description: 'Data visualization for social media metrics',
    tags: ['D3.js', 'Python'],
    image: '/projects/analytics.jpg'
  },
];

const ProjectSlider = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const splide = new Splide('.splide', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 3,
        autoScroll: {
          speed: 1,
          pauseOnHover: true,
          pauseOnFocus: false,
        },
        breakpoints: {
          1024: {
            perPage: 2,
          },
          768: {
            perPage: 1,
          },
        },
      });

      splide.mount({ AutoScroll });

      return () => {
        splide.destroy();
      };
    }
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sectionTitle}>Featured Projects</h2>
      <div className={`splide ${styles.splide}`}>
        <div className="splide__track">
          <ul className="splide__list">
            {projects.map((project) => (
              <li key={project.id} className={`splide__slide ${styles.slide}`}>
                <div className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className={styles.projectContent}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className={styles.tags}>
                      {project.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectSlider;