import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Seprator from '../components/Seprator/Seprator'
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm/ContactForm';
import contact from '../assets/contact.png';
import Blogs from '../components/Blogs/Blogs';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [bottomReached, setBottomReached] = useState(false);

    const navigate = useNavigate();

    const blogData = [
        {
            id: 1,
            title: "How to Nail the Effortlessly Chic Look This Fall",
            date: "31/08/2024",
            description: "From cozy oversized sweaters and classic trench coats to high-quality basics and stylish ankle boots, we cover the essential wardrobe pieces you need to stay chic this fall.",
            image: "https://res.cloudinary.com/dqone7ala/image/upload/v1725126509/Blog/imagecatwalk-1840941_1280.jpg-1725126508158-993754969.jpg",
            category: "Fashion",
            author: "Test User"
        },
        {
            id: 2,
            title: "PlayStation 5 Unleashed: A Deep Dive into the Next-Gen Gaming Experience",
            date: "04/01/2024",
            description: "Step into the future of gaming with our comprehensive exploration of the PlayStation 5. From groundbreaking hardware innovations to the latest AAA titles.",
            image: "https://res.cloudinary.com/dqone7ala/image/upload/v1704296869/Blog/imagejbareham_201022_ply1040_ps5_lead_0002.0.jpg-1704296868260-489540021.jpg",
            category: "Gaming",
            author: "Test User",
            content: "<b>Introduction: A New Era in Gaming</b><br>As we step into the future, the PlayStation 5 stands tall as a symbol of innovation and gaming excellence. In this blog, we invite you to join us on a captivating journey through the various facets that make the PS5 a true game-changer.<br><br><b>The Powerhouse Console: Unleashing Potential</b><br>Let's kick things off with a closer look at the beating heart of the PS5 — its hardware. From the custom AMD processor to the revolutionary SSD and the intricate cooling system, discover the technological marvels that deliver unparalleled graphics and lightning-fast performance.<br><br><b>DualSense Controller: A Symphony of Sensation</b><br>Explore the DualSense controller, a device that transcends traditional gaming input. Adaptive triggers, haptic feedback, and 3D audio redefine the gaming experience. How do these features immerse players in their favorite worlds, and what does it mean for the future of interactive entertainment?<br><br><b>Exclusive Titles and Launch Games: Gaming's Finest Hour</b><br>Delve into the exclusive titles and launch games that showcase the PS5's capabilities. From the awe-inspiring visuals of Demon's Souls to the high-octane adventures of Spider-Man: Miles Morales, we dissect how these games contribute to the PS5's identity and set the stage for the next era of gaming.<br><br><b>Backward Compatibility and Game Library: Bridging Generations</b><br>Take a moment to appreciate the PS5's backward compatibility, allowing gamers to revisit beloved PS4 titles with enhanced performance. Journey through the expanding library of games, both exclusive and third-party, fostering a diverse and inclusive gaming ecosystem.<br><br><b>User Interface and Features: Navigating the Future</b><br>Tour the redesigned user interface, where the Control Center, Activities feature, and social integration redefine how players interact with their gaming universe. How do these features enhance the overall gaming experience and foster a sense of community among players?<br><br><b>Performance and Load Times: Elevating the Experience</b><br>Dive into the technical realm, comparing performance metrics, load times, and graphics quality between the PS5 and its predecessor. How do these advancements contribute to a more immersive gaming experience, and what does it mean for player satisfaction?<br><br><b>Future of Gaming: A Glimpse Beyond the Horizon</b><br>Cast your eyes towards the future of gaming with the PS5. Explore upcoming titles, rumored features, and potential industry advancements that this console might catalyze. How is the PS5 shaping the trajectory of gaming, and what does it hold for players on the horizon?<br><br><b>Community Showcase: Celebrating Shared Experiences</b><br>In this section, we turn the spotlight on the vibrant PS5 community. Marvel at fan art, in-game photography, and noteworthy achievements that showcase the collective passion and enthusiasm of PlayStation 5 players worldwide.<br><br><b>Conclusion</b><br>This extensive blog endeavors to provide a sweeping panorama of the PlayStation 5, celebrating its technological prowess, exploring its rich game library, and contemplating the exciting possibilities that lie ahead in the realm of next-gen gaming. Whether you're a proud owner or a curious observer, join us on this exhilarating journey into the future of gaming with the PlayStation 5."
        },
        {
            id: 3,
            title: "The Future of Construction Tech",
            date: "May 21, 2025",
            description: "Technology is rapidly transforming construction. In this post, we explore AI, BIM, and sustainable practices shaping the future.",
            image: "https://bethmar.co.uk/assets/BannerImage-rox9Tt-a.jpg",
            category: "Construction",
            author: "Test User",
            content: "<b>Introduction: A New Era in Gaming</b><br>As we step into the future, the PlayStation 5 stands tall as a symbol of innovation and gaming excellence. In this blog, we invite you to join us on a captivating journey through the various facets that make the PS5 a true game-changer.<br><br><b>The Powerhouse Console: Unleashing Potential</b><br>Let's kick things off with a closer look at the beating heart of the PS5 — its hardware. From the custom AMD processor to the revolutionary SSD and the intricate cooling system, discover the technological marvels that deliver unparalleled graphics and lightning-fast performance.<br><br><b>DualSense Controller: A Symphony of Sensation</b><br>Explore the DualSense controller, a device that transcends traditional gaming input. Adaptive triggers, haptic feedback, and 3D audio redefine the gaming experience. How do these features immerse players in their favorite worlds, and what does it mean for the future of interactive entertainment?<br><br><b>Exclusive Titles and Launch Games: Gaming's Finest Hour</b><br>Delve into the exclusive titles and launch games that showcase the PS5's capabilities. From the awe-inspiring visuals of Demon's Souls to the high-octane adventures of Spider-Man: Miles Morales, we dissect how these games contribute to the PS5's identity and set the stage for the next era of gaming.<br><br><b>Backward Compatibility and Game Library: Bridging Generations</b><br>Take a moment to appreciate the PS5's backward compatibility, allowing gamers to revisit beloved PS4 titles with enhanced performance. Journey through the expanding library of games, both exclusive and third-party, fostering a diverse and inclusive gaming ecosystem.<br><br><b>User Interface and Features: Navigating the Future</b><br>Tour the redesigned user interface, where the Control Center, Activities feature, and social integration redefine how players interact with their gaming universe. How do these features enhance the overall gaming experience and foster a sense of community among players?<br><br><b>Performance and Load Times: Elevating the Experience</b><br>Dive into the technical realm, comparing performance metrics, load times, and graphics quality between the PS5 and its predecessor. How do these advancements contribute to a more immersive gaming experience, and what does it mean for player satisfaction?<br><br><b>Future of Gaming: A Glimpse Beyond the Horizon</b><br>Cast your eyes towards the future of gaming with the PS5. Explore upcoming titles, rumored features, and potential industry advancements that this console might catalyze. How is the PS5 shaping the trajectory of gaming, and what does it hold for players on the horizon?<br><br><b>Community Showcase: Celebrating Shared Experiences</b><br>In this section, we turn the spotlight on the vibrant PS5 community. Marvel at fan art, in-game photography, and noteworthy achievements that showcase the collective passion and enthusiasm of PlayStation 5 players worldwide.<br><br><b>Conclusion</b><br>This extensive blog endeavors to provide a sweeping panorama of the PlayStation 5, celebrating its technological prowess, exploring its rich game library, and contemplating the exciting possibilities that lie ahead in the realm of next-gen gaming. Whether you're a proud owner or a curious observer, join us on this exhilarating journey into the future of gaming with the PlayStation 5."
        },
        {
            id: 4,
            title: "The Future of Construction Tech",
            date: "May 21, 2025",
            description: "Technology is rapidly transforming construction. In this post, we explore AI, BIM, and sustainable practices shaping the future.",
            image: "https://bethmar.co.uk/assets/BannerImage-rox9Tt-a.jpg",
            category: "Construction",
            author: "Test User",
            content: "<b>Introduction to Modern Construction</b><br>Modern construction is not just about bricks and cement—it's about innovation, technology, and sustainability.<br><br><b>Smart Construction Techniques</b><br>Advanced methods such as 3D printing, modular construction, and prefabricated materials have changed the way buildings are designed and built.<br><br><b>Role of Technology</b><br>Technologies like drones, AI, and BIM (Building Information Modeling) are improving efficiency, safety, and accuracy on construction sites.<br><br><b>Sustainable Building Practices</b><br>Green building practices focus on reducing environmental impact through energy-efficient systems and eco-friendly materials.<br><br><b>Workforce & Safety</b><br>Ensuring skilled labor and following strict safety protocols is essential for maintaining quality and reducing accidents.<br><br><b>Conclusion</b><br>The construction industry is rapidly evolving, and adapting to these changes is key to building the cities of tomorrow."
        }
    ];

    const handleClick = () => {
        setFormVisible(!formVisible);
    };

    const handleScroll = () => {
        const currentPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const distanceFromBottom = documentHeight - (currentPosition + windowHeight);

        setBottomReached(distanceFromBottom <= 100);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const calculatePosition = () => {
        if (bottomReached) {
            return 'top-[55%]';
        }
        return 'top-[85%]';
    };

    const handleBlogClick = (blogData) => {
        navigate(`/blog/${blogData.id}`, { state: blogData });
    };

    return (
        <div className='bg-[#f9f9f9]'>
            <div className='relative'>
                <Navbar />

                <div className='max-w-[1500px] mx-auto gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4'>
                    {blogData.map((blog, index) => (
                        <Blogs
                            key={index}
                            title={blog.title}
                            date={blog.date}
                            description={blog.description}
                            image={blog.image}
                            category={blog.category}
                            author={blog.author}
                            content={blog.content}
                            onClick={() => handleBlogClick(blog)}
                        />
                    ))}
                </div>
                <Footer />
                <motion.div
                    initial={{ scale: 2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    onClick={handleClick}
                    className={`z-50 md:h-14 md:w-14 h-14 w-14 fixed ${calculatePosition()} right-1 cursor-pointer`}
                >
                    <img src={contact} alt="Contact" height={100} width={100} className='hover:scale-110 transition-all ease-in-out duration-300' />
                </motion.div>
                {formVisible && (
                    <ContactForm onClose={handleClick} />
                )}
                {/* <Seprator color={'bg-moving-gradient'} /> */}
            </div>
        </div>
    )
}

export default Blog