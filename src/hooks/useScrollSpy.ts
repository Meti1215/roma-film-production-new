import { useEffect, useState } from 'react';

export function useScrollSpy(sectionSelectors: string, options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>('home');

  useEffect(() => {
    const sections = document.querySelectorAll(sectionSelectors);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      options || { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [sectionSelectors, options]);

  return activeId;
}
