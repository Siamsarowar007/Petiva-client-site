import React from 'react';
import Banner from '../../Banner/Banner';
import TagsSection from '../TagsSection/TagsSection';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';
import AnnouncementList from './Home/AnnouncementList';
import FeaturedPosts from '../FeaturedPosts/FeaturedPosts';
import HomePost from '../AllPost/HomePost';
import HowItWorksSection from './Home/HowItWorksSection';
import TestimonialsSection from './Home/TestimonialsSection';
import PartnersSection from './Home/PartnersSection';




const HomeLayout = () => {
    return (
        <div>
            <title>Home || Petiva</title>
            <Banner></Banner>
            <TagsSection></TagsSection>
            <HomePost></HomePost>
            <AnnouncementSection></AnnouncementSection>
            {/* <FeaturedPosts></FeaturedPosts> */}
            <PartnersSection></PartnersSection>
            <HowItWorksSection></HowItWorksSection>
            {/* <TestimonialsSection></TestimonialsSection> */}
        </div>
    );
};

export default HomeLayout;