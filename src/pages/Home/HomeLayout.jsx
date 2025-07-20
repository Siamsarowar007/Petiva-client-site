import React from 'react';
import Banner from '../../Banner/Banner';
import TagsSection from '../TagsSection/TagsSection';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';
import AnnouncementList from './Home/AnnouncementList';
import FeaturedPosts from '../FeaturedPosts/FeaturedPosts';
import HomePost from '../AllPost/HomePost';




const HomeLayout = () => {
    return (
        <div>
            <title>Home || Petiva</title>
            <Banner></Banner>
            <TagsSection></TagsSection>
            <AnnouncementSection></AnnouncementSection>
            <HomePost></HomePost>
            {/* <FeaturedPosts></FeaturedPosts> */}
        </div>
    );
};

export default HomeLayout;