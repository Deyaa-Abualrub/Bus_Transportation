import "../Styles/Home.css";
import HeroSection from '../Component/HeroSection';
import ShuttleSection from "../Component/ShuttleSecion";
import  WhyChooseUsSection from "../Component/WhyChooseUsSection"
import ServicesSection from "../Component/ServicesSection";
import TestimonialsSection from "../Component/TestimonialsSection";
import Statistic from "../Component/Statistic";

export default function Home(){
return (
    <>
      <HeroSection></HeroSection>
      <Statistic></Statistic>
      <ShuttleSection></ShuttleSection>
      <WhyChooseUsSection></WhyChooseUsSection>
      <TestimonialsSection></TestimonialsSection>
      <ServicesSection></ServicesSection>
    </>
)
}

