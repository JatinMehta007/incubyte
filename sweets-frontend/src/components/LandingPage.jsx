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
    <div className="w-[90%] mx-auto   justify-center items-center mt-[10%]">
      <div className=" text-center space-y-8 ">
        <EncryptedText
          text="Discover a wide variety of traditional and modern sweets, freshly prepared and available for instant purchase"
          className={`text-4xl font-bold tracking-wider `}
          revealDelayMs={50}
        ></EncryptedText>
        <br />
        <EncryptedText
          text="With Every Delicious Bite "
          className={`text-4xl font-semibold text-blue-500 tracking-wider `}
          revealDelayMs={50}
        ></EncryptedText>
        <p className="text-xl">A modern twist on traditional flavors, served in a vibrant and welcoming setting.</p>
      </div>
      <div>

      {/* SECTION 1 — Signature Dishes */}
      <div className="px-10 py-16 bg-[#a6d4e2] mt-40">
        <h2 className="text-center block text-4xl font-medium mb-10">
        Our Signature Rajasthani Dishes
        </h2>
        <div className="flex justify-around items-center">

        <DraggableCardContainer className=" items-center justify-center overflow-clip">
      <DraggableCardBody>
        <img
          src="/ghevar.jpg"
          alt="Some mountains"
          className="pointer-events-none  relative h-80 w-full "
          />
        <p className="mt-4 text-center text-2xl font-medium ">
          Ghevar
        </p>
        
      </DraggableCardBody>
    </DraggableCardContainer>

    <DraggableCardContainer className=" items-center justify-center overflow-clip">
      <DraggableCardBody>
        <img
          src="/lmb.jpg"
          alt="Some mountains"
          className="pointer-events-none relative z-10 h-80 w-full "
          />
        <p className="mt-4 text-center text-2xl font-medium ">
          Gud Gajak
        </p>
        
      </DraggableCardBody>
    </DraggableCardContainer>

    <DraggableCardContainer className=" items-center justify-center overflow-clip">
      <DraggableCardBody>
        <img
          src="/phini.jpg"
          alt="Some mountains"
          className="pointer-events-none relative z-10 h-80 w-full "
          />
        <p className="mt-4 text-center text-2xl font-medium ">
          Dhoodh Phinni Meethi
        </p>
        
      </DraggableCardBody>
    </DraggableCardContainer>
    
          </div>
        </div>
        
        {/* SECTION 3 — Experience Banner */}
<section className="py-20 bg-[#a6d4e2]  text-center">
<h2 className="text-4xl font-medium">Experience the Rich Taste of Rajasthani Sweets</h2>
<p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
Discover a wide variety of freshly prepared mithai, inspired by traditional recipes and delivered through a modern, seamless shopping experience.
</p>
<button onClick={() => navigate("/register")} className="mt-8 px-8 py-3 bg-blue-500 text-white  font-semibold shadow hover:bg-blue-600">
  Explore Menu
</button>
</section>


{/* SECTION 4 — Customer Reviews */}
<div className="py-16">
<h2 className="text-center text-4xl font-bold mb-10">What Our Customers Say</h2>
<AnimatedTestimonials testimonials={testimonials} />
</div>

{/* SECTION 5 — Footer */}
<footer className="bg-[#a6d4e2] py-10 text-center">
  <p className="font-medium">
    © 2025 MithaiMart — All Rights Reserved
  </p>
  <p className="text-gray-700 mt-2">
    Crafted with tradition & sweetness in Rajasthan 
  </p>
</footer>
          </div>
    </div>
  );
}
