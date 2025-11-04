import React from 'react';
import { BLOG_POSTS_DATA } from '../constants';
import type { View } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

interface BlogPageProps {
    setView: (view: View) => void;
}

const AnimatedCard: React.FC<{children: React.ReactNode, delay: number}> = ({ children, delay }) => {
    // Fix: Removed 'triggerOnce' as it's not a valid property for IntersectionObserverInit. The hook's implementation already ensures it triggers once.
    const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`opacity-0 ${isVisible ? 'animate-fadeInUp' : ''}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const BlogPage: React.FC<BlogPageProps> = ({ setView }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Blog</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Stay updated with the latest news, tips, and articles on colleges, exams, and careers.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS_DATA.map((post, index) => (
                    <AnimatedCard key={post.id} delay={index * 100}>
                        <div 
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer h-full flex flex-col border"
                            onClick={() => setView({ page: 'blog-detail', postId: post.id })}
                        >
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[--primary-medium] transition-colors duration-300 flex-grow">{post.title}</h2>
                                <p className="text-sm text-slate-500 mt-2">{post.author} &bull; {post.date}</p>
                                <p className="text-slate-600 mt-4 text-base flex-grow">{post.excerpt}</p>
                                <div className="mt-6">
                                  <span className="font-semibold text-[--primary-medium] group-hover:underline">Read More &rarr;</span>
                                </div>
                            </div>
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;