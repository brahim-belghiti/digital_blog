import { useState } from 'react';

export default function TagFilter({ tags }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
    // In a real app, you'd filter posts here or navigate to /tags/:tag
    window.location.href = `/tags/${tag}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 text-sm rounded-full font-sans ${
            selectedTag === tag
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}