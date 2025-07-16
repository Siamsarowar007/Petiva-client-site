import React from 'react';
import Banner from '../../Banner/Banner';
import TagsSection from '../TagsSection/TagsSection';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';
import AnnouncementList from './Home/AnnouncementList';
import FeaturedPosts from '../FeaturedPosts/FeaturedPosts';




const HomeLayout = () => {
    return (
        <div>
            <Banner></Banner>
            <TagsSection></TagsSection>
            <AnnouncementSection></AnnouncementSection>
            {/* <FeaturedPosts></FeaturedPosts> */}
        </div>
    );
};

export default HomeLayout;