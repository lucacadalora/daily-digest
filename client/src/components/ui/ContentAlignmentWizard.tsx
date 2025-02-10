import React, { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface ContentAlignment {
  headerSpacing: boolean;
  typographyConsistency: boolean;
  gridAlignment: boolean;
  sectionSpacing: boolean;
}

interface ContentAlignmentProps {
  children: React.ReactNode;
  onAlignmentChange?: (alignment: ContentAlignment) => void;
}

export const ContentAlignmentWizard: React.FC<ContentAlignmentProps> = ({
  children,
  onAlignmentChange
}) => {
  useEffect(() => {
    const checkAlignment = () => {
      const container = document.querySelector('.content-container');
      if (!container) return;

      const alignment: ContentAlignment = {
        headerSpacing: checkHeaderSpacing(container),
        typographyConsistency: checkTypography(container),
        gridAlignment: checkGridAlignment(container),
        sectionSpacing: checkSectionSpacing(container)
      };

      if (onAlignmentChange) {
        onAlignmentChange(alignment);
      }

      // Show toast for any inconsistencies
      reportInconsistencies(alignment);
    };

    // Initial check
    checkAlignment();

    // Set up mutation observer for dynamic content changes
    const observer = new MutationObserver(checkAlignment);
    const config = { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      characterData: true 
    };

    if (document.querySelector('.content-container')) {
      observer.observe(document.querySelector('.content-container')!, config);
    }

    return () => observer.disconnect();
  }, [onAlignmentChange]);

  const checkHeaderSpacing = (container: Element): boolean => {
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let consistent = true;

    headers.forEach((header) => {
      const style = window.getComputedStyle(header);
      const marginBottom = parseInt(style.marginBottom);
      
      // Check if header follows spacing rules
      if (header.tagName === 'H1' && marginBottom !== 16) consistent = false;
      if (header.tagName === 'H2' && marginBottom !== 12) consistent = false;
      if (['H3', 'H4', 'H5', 'H6'].includes(header.tagName) && marginBottom !== 8) consistent = false;
    });

    return consistent;
  };

  const checkTypography = (container: Element): boolean => {
    const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    let consistent = true;

    textElements.forEach((element) => {
      const style = window.getComputedStyle(element);
      
      // Check font families
      if (element.tagName === 'P' && !style.fontFamily.includes('system-ui')) consistent = false;
      if (['H1', 'H2'].includes(element.tagName) && !style.fontFamily.includes('serif')) consistent = false;
      
      // Check font sizes
      if (element.tagName === 'H1' && style.fontSize !== '2.25rem') consistent = false;
      if (element.tagName === 'H2' && style.fontSize !== '1.875rem') consistent = false;
      if (element.tagName === 'P' && style.fontSize !== '1rem') consistent = false;
    });

    return consistent;
  };

  const checkGridAlignment = (container: Element): boolean => {
    const grids = container.querySelectorAll('.grid');
    let consistent = true;

    grids.forEach((grid) => {
      const style = window.getComputedStyle(grid);
      // Check if grid gaps are consistent
      if (style.gap !== '1rem') consistent = false;
      
      // Check if grid columns follow the pattern
      const columns = style.gridTemplateColumns;
      if (!columns.includes('repeat(') && !columns.includes('minmax(')) {
        consistent = false;
      }
    });

    return consistent;
  };

  const checkSectionSpacing = (container: Element): boolean => {
    const sections = container.querySelectorAll('section');
    let consistent = true;

    sections.forEach((section) => {
      const style = window.getComputedStyle(section);
      // Check if sections have consistent spacing
      if (parseInt(style.marginBottom) !== 32) consistent = false;
      if (parseInt(style.marginTop) !== 32) consistent = false;
    });

    return consistent;
  };

  const reportInconsistencies = (alignment: ContentAlignment) => {
    if (!alignment.headerSpacing) {
      toast({
        title: "Header Spacing Inconsistency",
        description: "Headers are not following the standard spacing guidelines.",
        variant: "destructive"
      });
    }
    if (!alignment.typographyConsistency) {
      toast({
        title: "Typography Inconsistency",
        description: "Font families or sizes are not consistent with design system.",
        variant: "destructive"
      });
    }
    if (!alignment.gridAlignment) {
      toast({
        title: "Grid Alignment Issue",
        description: "Grid layouts are not following the standard pattern.",
        variant: "destructive"
      });
    }
    if (!alignment.sectionSpacing) {
      toast({
        title: "Section Spacing Issue",
        description: "Sections are not maintaining consistent spacing.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="content-container">
      {children}
    </div>
  );
};

export default ContentAlignmentWizard;
