import { useState, useEffect, useRef } from 'react';

export default function SlideNotes() {
  const [notes, setNotes] = useState([]);
  const [width, setWidth] = useState(400); // Default width for slides
  const containerRef = useRef(null);

  // Effect to intercept clicks on internal links in article
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const handleClick = async (e) => {
      const target = e.target;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      // Only handle internal blog links
      if (anchor.href.includes('/blog/') && !anchor.getAttribute('target')) {
        e.preventDefault();
        const url = new URL(anchor.href);
        const slug = url.pathname.split('/blog/')[1];
        console.log("Detected slug:", slug);
        
        // Check if the note is already open
        if (slug) {
          const existingIndex = notes.findIndex(note => note.slug === slug);
          
          if (existingIndex >= 0) {
            // Note is already open, remove notes to the right and focus on this one
            setNotes(prev => prev.slice(0, existingIndex + 1));
          } else {
            // Add a new note
            setNotes(prev => [...prev, { 
              slug, 
              title: slug.replace(/-/g, ' '),
              content: '',
              isLoading: true
            }]);
            
            try {
              // Fetch the note content
              console.log("Fetching note content for:", slug);
              const response = await fetch(`/api/note/${slug}`);
              console.log("🚀 ~ handleClick ~ response:", response)
              
              if (!response.ok) {
                throw new Error(`Failed to load note: ${response.statusText}`);
              }
              
              const data = await response.json();
              console.log("Received data:", data);
              
              // Update the note with actual content
              setNotes(prev => prev.map(note => 
                note.slug === slug 
                  ? { 
                      ...note, 
                      title: data.title, 
                      content: data.content, 
                      tags: data.tags,
                      date: data.date,
                      isLoading: false 
                    } 
                  : note
              ));
            } catch (error) {
              console.error("Error loading note:", error);
              
              // Update with error state
              setNotes(prev => prev.map(note => 
                note.slug === slug 
                  ? { ...note, content: "Failed to load note content.", isLoading: false } 
                  : note
              ));
            }
          }
        }
      }
    };

    article.addEventListener('click', handleClick);
    return () => article.removeEventListener('click', handleClick);
  }, [notes]);

  // Effect to handle clicks on internal links within slide notes
  useEffect(() => {
    const slidesContainer = containerRef.current;
    if (!slidesContainer) return;

    const handleSlideClick = async (e) => {
      const target = e.target;
      const anchor = target.closest('a');
      
      if (!anchor || !anchor.href.includes('/blog/') || anchor.getAttribute('target')) return;
      
      e.preventDefault();
      const url = new URL(anchor.href);
      const slug = url.pathname.split('/blog/')[1];
      
      if (!slug) return;
      
      // Find if this came from a specific note
      let sourceNoteElement = target;
      let sourceNoteIndex = -1;
      
      while (sourceNoteElement && !sourceNoteElement.hasAttribute('data-note-index')) {
        sourceNoteElement = sourceNoteElement.parentElement;
      }
      
      if (sourceNoteElement) {
        sourceNoteIndex = parseInt(sourceNoteElement.getAttribute('data-note-index') || '-1', 10);
      }
      
      // If we found a source note, remove all notes to the right of it
      if (sourceNoteIndex >= 0) {
        setNotes(prev => {
          const existingIndex = prev.findIndex(note => note.slug === slug);
          
          // If note already exists, remove notes to the right of source and to the right of existing
          if (existingIndex >= 0) {
            const cutIndex = Math.min(sourceNoteIndex + 1, existingIndex);
            return prev.slice(0, cutIndex);
          }
          
          // Otherwise remove notes to the right of source and add the new one
          const baseNotes = prev.slice(0, sourceNoteIndex + 1);
          return [...baseNotes, { 
            slug, 
            title: slug.replace(/-/g, ' '),
            content: '',
            isLoading: true
          }];
        });
        
        // Fetch the new note content
        try {
          const response = await fetch(`/api/note/${slug}`);
          
          if (!response.ok) {
            throw new Error(`Failed to load note: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // Update the note with actual content
          setNotes(prev => prev.map(note => 
            note.slug === slug 
              ? { 
                  ...note, 
                  title: data.title, 
                  content: data.content, 
                  tags: data.tags,
                  date: data.date,
                  isLoading: false 
                } 
              : note
          ));
        } catch (error) {
          console.error("Error loading note:", error);
          
          // Update with error state
          setNotes(prev => prev.map(note => 
            note.slug === slug 
              ? { ...note, content: "Failed to load note content.", isLoading: false } 
              : note
          ));
        }
      }
    };

    slidesContainer.addEventListener('click', handleSlideClick);
    return () => slidesContainer.removeEventListener('click', handleSlideClick);
  }, [notes]);

  const handleClose = (slugToRemove) => {
    // Remove the note and all notes to the right of it
    const index = notes.findIndex(note => note.slug === slugToRemove);
    if (index >= 0) {
      setNotes(prev => prev.slice(0, index));
    }
  };

  // Handle resize functionality
  const handleResize = (e, index) => {
    e.preventDefault();
    
    const startX = e.clientX;
    const startWidth = width;
    
    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(300, Math.min(600, startWidth + deltaX));
      setWidth(newWidth);
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  if (notes.length === 0) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 right-0 h-full flex overflow-hidden z-10 shadow-xl"
      style={{ paddingLeft: notes.length ? '60px' : 0 }}
    >
      {notes.map((note, index) => (
        <div 
          key={note.slug}
          data-note-index={index}
          className="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-auto relative flex-shrink-0"
          style={{ width: `${width}px` }}
        >
          {/* Resize handle */}
          {index > 0 && (
            <div 
              className="absolute left-0 top-0 w-1 h-full cursor-ew-resize hover:bg-blue-400 z-30"
              onMouseDown={(e) => handleResize(e, index)}
            />
          )}
          
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-20">
            <h2 className="text-lg font-semibold text-black dark:text-white truncate">
              {note.title}
            </h2>
            <button 
              onClick={() => handleClose(note.slug)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close note"
            >
              ×
            </button>
          </div>
          
          <div className="p-4">
            {note.isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
              </div>
            ) : (
              <>
                {note.date && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                )}
                
                <div 
                  className="prose dark:prose-invert max-w-none font-sans"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
                
                {note.tags && note.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}