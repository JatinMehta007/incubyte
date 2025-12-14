import { EncryptedText } from "../ui/text";
import { DraggableCardBody, DraggableCardContainer } from "../ui/dragable";
import { AnimatedTestimonials } from "../ui/testimonial"; 
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const testimonials = [
    {
      quote:
        "MithaiMart brings authentic Rajasthani sweets right to your screen. The taste, quality, and smooth buying experience are truly impressive.",
      name: "Aarav Sharma",
      designation: "Food Blogger",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I loved how easy it was to search and purchase traditional mithai. The sweets tasted fresh and reminded me of Rajasthan.",
      name: "Priya Sharma",
      designation: "Homemaker",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Neha Jain",
      designation: "Small Business Owner",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="w-full sm:w-[95%] md:w-[90%] mx-auto justify-center items-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6">
      <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
        <EncryptedText
          text="Discover a wide variety of traditional and modern sweets, freshly prepared and available for instant purchase"
          className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider px-2`}
          revealDelayMs={50}
        ></EncryptedText>
        <br />
        <EncryptedText
          text="With Every Delicious Bite "
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-500 tracking-wider px-2`}
          revealDelayMs={50}
        ></EncryptedText>
        <p className="text-base sm:text-lg md:text-xl px-4">A modern twist on traditional flavors, served in a vibrant and welcoming setting.</p>
      </div>
      <div>

      {/* SECTION 1 — Signature Dishes */}
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 bg-[#a6d4e2] mt-12 sm:mt-20 md:mt-32 lg:mt-40">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8 md:mb-10">
        Our Signature Rajasthani Dishes
        </h2>
        <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4">

        <DraggableCardContainer className="items-center justify-center overflow-clip w-full sm:w-auto">
      <DraggableCardBody>
        <img
          src="/ghevar.jpg"
          alt="Ghevar"
          className="pointer-events-none relative h-48 sm:h-64 md:h-80 w-full object-cover"
          />
        <p className="mt-4 text-center text-lg sm:text-xl md:text-2xl font-medium">
          Ghevar
        </p>
        
      </DraggableCardBody>
    </DraggableCardContainer>

    <DraggableCardContainer className="items-center justify-center overflow-clip w-full sm:w-auto">
      <DraggableCardBody>
        <img
          src="/lmb.jpg"
          alt="Gud Gajak"
          className="pointer-events-none relative z-10 h-48 sm:h-64 md:h-80 w-full object-cover"
          />
        <p className="mt-4 text-center text-lg sm:text-xl md:text-2xl font-medium">
          Gud Gajak
        </p>
        
      </DraggableCardBody>
    </DraggableCardContainer>

    <DraggableCardContainer className="items-center justify-center overflow-clip w-full sm:w-auto">
      <DraggableCardBody>
        <img
          src="/phini.jpg"
          alt="Dhoodh Phinni Meethi"
          className="pointer-events-none relative z-10 h-48 sm:h-64 md:h-80 w-full object-cover"
          />
        <p className="mt-4 text-center text-lg sm:text-xl md:text-2xl font-medium">
          Dhoodh Phinni Meethi
        </p>
        
      </DraggableCardBody>
    </DraggableCardContainer>
    
          </div>
        </div>
        
        {/* SECTION 3 — Experience Banner */}
<section className="py-12 sm:py-16 md:py-20 bg-[#a6d4e2] text-center px-4 sm:px-6">
<h2 className="text-2xl sm:text-3xl md:text-4xl font-medium px-4">Experience the Rich Taste of Rajasthani Sweets</h2>
<p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto px-4">
Discover a wide variety of freshly prepared mithai, inspired by traditional recipes and delivered through a modern, seamless shopping experience.
</p>
<button onClick={() => navigate("/register")} className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 text-white text-sm sm:text-base font-semibold shadow hover:bg-blue-600 rounded-lg">
  Explore Menu
</button>
</section>


{/* SECTION 4 — Customer Reviews */}
<div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
<h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">What Our Customers Say</h2>
<AnimatedTestimonials testimonials={testimonials} />
</div>

{/* SECTION 5 — Footer */}
<footer className="bg-[#a6d4e2] py-6 sm:py-8 md:py-10 text-center px-4">
  <p className="font-medium text-sm sm:text-base">
    © 2025 MithaiMart — All Rights Reserved
  </p>
  <p className="text-gray-700 mt-2 text-xs sm:text-sm">
    Crafted with tradition & sweetness in Rajasthan 
  </p>
</footer>
          </div>
    </div>
  );
}
