export default function RelatedNotes({ posts }) {
    if (!posts || posts.length === 0) return null;
  
    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-black dark:text-white font-sans mb-4">
          Related Notes
        </h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <a
                href={`/blog/${post.slug}`}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-sans"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span>{post.data.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }